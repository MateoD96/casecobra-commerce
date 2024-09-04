"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { ShippingAddress } from "@prisma/client";
import shippingAddressSchema from "../validations/address-shipping";

export async function checkAddress() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Invalid data");
  }

  const userAddress = await db.shippingAddress.findFirst({
    where: {
      email: session.user.email!,
    },
  });

  return userAddress ? userAddress.id : null;
}

export async function registerShippingAddress(values: ShippingAddress) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw Error("Unauthorized");
  }

  const dat = shippingAddressSchema.parse(values);

  const idShippingAddres = await db.shippingAddress.create({
    data: {
      name: dat.name,
      street: dat.street,
      city: dat.city,
      phoneNumber: dat.phoneNumber,
      postalCode: dat.postalCode,
      country: dat.country,
      email: session.user?.email!,
    },
  });

  return idShippingAddres ? idShippingAddres.id : null;
}
