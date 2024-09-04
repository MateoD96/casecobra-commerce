import { z } from "zod";

const shippingAddressSchema = z.object({
  name: z.string().min(2).max(50),
  street: z.string().min(4).max(100),
  city: z.string().min(2).max(100),
  postalCode: z.string().min(4).max(4),
  country: z.string().min(3).max(50),
  phoneNumber: z.string().min(6).max(13),
});

export default shippingAddressSchema;
