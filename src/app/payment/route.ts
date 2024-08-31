import { Payment } from "mercadopago";
import { client } from "@/lib/mercadopago";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const res = await request
    .json()
    .then((data) => data as { data: { id: string } });

  const payment = await new Payment(client).get({ id: res.data.id });

  console.log(payment.status_detail);
  console.log(payment.status);

  console.log(payment.additional_info?.items);
  console.log(payment.metadata);

  return NextResponse.json({ success: true });
};

/*   const xSignature = request.headers.get("x-signature")?.split(",") as string[];
  const xRequestId = request.headers.get("x-request-id");

  const dataID = request.nextUrl.searchParams.get("data.id");

  const signatureTemplate = `id:[${res.data.id}];request-id:[${xRequestId};ts:[${xSignature[0]}]`;

  const cyphedSignature = crypto
    .createHmac("sha256", process.env.SECRET_WEBHOOK_MP!)
    .update(signatureTemplate)
    .digest("hex");

  let ts;
  let hash;

  xSignature.forEach((part) => {
    // Split each part into key and value
    const [key, value] = part.split("=");
    if (key && value) {
      const trimmedKey = key.trim();
      const trimmedValue = value.trim();
      if (trimmedKey === "ts") {
        ts = trimmedValue;
      } else if (trimmedKey === "v1") {
        hash = trimmedValue;
      }
    }
  });

  const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;

  const hmac = crypto.createHmac("sha256", process.env.SECRET_WEBHOOK_MP!);
  hmac.update(manifest);
  const sha = hmac.digest("hex");

  if (sha === hash) {
    // HMAC verification passed
    const payment = await (
      await fetch(`https://api.mercadopago.com/v1/payments/${res.data.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN_MP}`,
        },
      })
    ).json();

    console.log(payment);

    console.log("HMAC verification passed");
  } else {
    // HMAC verification failed
    console.log("HMAC verification failed");
  }
 */
