import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import getSession from "@/lib/getSession";
import { notFound, redirect } from "next/navigation";
import ShippingForm from "./ShippingForm";

interface Params {
  searchParams: {
    id: string | string[] | undefined;
  };
}

export default async function ShippingAddresPage({ searchParams }: Params) {
  const { id } = searchParams;
  const session = await getSession();

  if (!id || typeof id !== "string") {
    notFound();
  }

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <MaxWidthWrapper>
      <div className="flex mx-auto w-full lg:w-2/4 mt-20 justify-center items-center">
        <div className="py-4 px-6 rounded-sm w-full bg-slate-100">
          <h3 className="text-3xl py-8 text-left tracking-tight font-bold">
            Address Shoping
          </h3>
          <ShippingForm configId={id} />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
