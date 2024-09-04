import { Payment } from "mercadopago";
import { client } from "@/lib/mercadopago";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";

export const POST = async (request: NextRequest) => {
  try {
    const res = await request
      .json()
      .then((data) => data as { data: { id: string } });

    //validate payment
    const payment = await new Payment(client).get({ id: res.data.id });

    if (!payment) {
      return NextResponse.json({ error: "Payment failed" }, { status: 400 });
    }

    const { order_id, user_mail } = payment.metadata || {
      order_id: null,
      user_mail: null,
    };

    if (!order_id || !user_mail) {
      throw new Error("Invalid request metadata");
    }

    if (
      payment.status_detail === "accredited" &&
      payment.status === "approved"
    ) {
      await db.order.update({
        where: {
          id: order_id,
        },
        data: {
          isPaid: true,
        },
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong", ok: false },
      { status: 500 }
    );
  }
};
