"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { checkAddress } from "../actions";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { createCheckoutSession } from "@/app/configure/preview/actions";

export default function CheckAddresPage() {
  const [configId, setConfigId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const config = localStorage.getItem("configId");
    if (config) setConfigId(config);
  }, []);

  const { mutate: createCheckout } = useMutation({
    mutationKey: ["get-checkout-session"],
    mutationFn: async (args: { configId: string; shippingAddres: string }) =>
      await createCheckoutSession({
        configId: args.configId,
        shippingAddressId: args.shippingAddres,
      }),
  });

  const { data: shippingAddressId } = useQuery({
    queryKey: ["check-address-info"],
    queryFn: async () => checkAddress(),
  });

  useEffect(() => {
    localStorage.removeItem("configId");
    if (shippingAddressId && configId) {
      createCheckout({ configId, shippingAddres: shippingAddressId });
    } else if (!shippingAddressId && configId) {
      router.push(`/shipping-address?id=${configId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingAddressId]);

  return (
    <div className=" w-full mt-24 flex justify-center">
      <div className=" flex flex-col items-center gap-2">
        <Loader2 className=" h-8 w-8 animate-spin text-zinc-500" />
        <h3 className=" font-semibold text-xl ">Check data...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
}
