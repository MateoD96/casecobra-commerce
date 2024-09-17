"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateStatusShipped({
  id,
  status,
}: {
  id: string;
  status: OrderStatus;
}) {
  try {
    const session = await auth();

    if (!session?.user || session.user.email !== process.env.ADMIN_EMAIL) {
      throw new Error("Unautorized");
    }

    await db.order.update({
      where: {
        id,
      },
      data: {
        orderStatus: status,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
}
