import { notFound } from "next/navigation";

interface Params {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default function ThankYouPage({ searchParams }: Params) {
  const { orderId } = searchParams;

  if (typeof orderId !== "string" || !orderId) {
    return notFound();
  }

  return <div>Thank You Page</div>;
}
