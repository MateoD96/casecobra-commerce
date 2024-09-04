"use server";

import { auth } from "@/auth";
import { db } from "@/db";

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
