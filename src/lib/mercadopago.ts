import { MercadoPagoConfig, Preference } from "mercadopago";

export const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN_MP!,
});

export const preference = new Preference(client);
