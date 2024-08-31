"use server";

import { auth } from "@/auth";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { db } from "@/db";
import { preference } from "@/lib/mercadopago";
import { Order } from "@prisma/client";
import { redirect } from "next/navigation";

export const createCheckoutSession = async ({
  configId,
}: {
  configId: string;
}) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You need to be logged in");
  }

  const configuration = await db.imagesConfiguration.findUnique({
    where: {
      id: configId,
    },
  });

  if (!configuration) {
    throw new Error("No such configuration found");
  }

  const { finish, material } = configuration;

  let price = BASE_PRICE;
  if (finish === "textured") price += PRODUCT_PRICES.finish.textured;
  if (material === "polycarbonate")
    price += PRODUCT_PRICES.material.polycarbonate;

  let order: Order | undefined = undefined;

  const exitingOrder = await db.order.findFirst({
    where: {
      userId: session.user.id!,
      configurationId: configuration.id,
    },
  });

  if (!exitingOrder) {
    order = await db.order.create({
      data: {
        amount: price / 100,
        orderStatus: "awaiting_shipment",
        userId: session.user.id!,
        configurationId: configuration.id,
      },
    });
  } else {
    order = exitingOrder;
  }

  //create payment
  const res = await preference.create({
    body: {
      items: [
        {
          id: configuration.id,
          title: `Custom ${configuration.model} case`,
          quantity: 1,
          picture_url: configuration.imageUrl!,
          unit_price: Number(price),
        },
      ],
      back_urls: {
        failure: "",
        success: `${process.env.NEXT_PUBLIC_URL}/thank-you?orderId=${order.id}`,
      },
      auto_return: "approved",
      metadata: {
        userId: session.user.id,
        userMail: session.user.email,
        orderId: order.id,
      },
    },
  });

  redirect(res.init_point!);
};
