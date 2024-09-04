import { auth } from "@/auth";
import { ShippingAddress } from "@prisma/client";
import shippingAddressSchema from "../validations/address-shipping";
import { db } from "@/db";

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
