"use server";

import { auth } from "@/auth";
import { db } from "@/db";

export async function checkAddress() {
  const session = await auth();

  if (!session?.user || !session.user.email) {
    throw new Error("You need to be logged in to view this page");
  }

  const userAddress = await db.shippingAddress.findFirst({
    where: {
      email: session.user.email!,
    },
  });

  if (!userAddress) {
    throw new Error("This data is not available");
  }

  return userAddress ? userAddress.id : false;
}
