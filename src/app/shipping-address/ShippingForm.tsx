"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@headlessui/react";
import shippingAddressSchema from "@/app/validations/address-shipping";
import { useMutation } from "@tanstack/react-query";
import { ShippingAddress } from "@prisma/client";
import { createCheckoutSession } from "@/app/configure/preview/actions";
import { toast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { registerShippingAddress } from "./actions";

export default function ShippingForm({ configId }: { configId: string }) {
  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      name: "",
      city: "",
      street: "",
      country: "",
      postalCode: "",
      phoneNumber: "",
    },
  });

  const {
    isPending: pendingRegisterData,
    data: shippingAddressId,
    mutate: insertShippingAddress,
  } = useMutation({
    mutationFn: async (args: ShippingAddress) =>
      await registerShippingAddress(args),
    onError: ({ message }) => {
      toast({
        title: message,
        variant: "destructive",
      });
    },
  });

  const { isPending: pendingCheck, mutate: createCheckSession } = useMutation({
    mutationFn: async ({
      configId,
      shippingAddressId,
    }: {
      configId: string;
      shippingAddressId: string;
    }) => await createCheckoutSession({ configId, shippingAddressId }),
    onError: ({ message }) => {
      toast({
        title: message,
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (shippingAddressId) {
      createCheckSession({ configId, shippingAddressId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingAddressId]);

  const onSubmit = async (values: z.infer<typeof shippingAddressSchema>) => {
    try {
      insertShippingAddress(values as ShippingAddress);
    } catch (error) {
      toast({
        title: `Error`,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className=" font-semibold text-gray-950">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="p-1 relative rounded-sm"
                      placeholder="name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="block w-full" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input
                      className="p-1 relative rounded-sm"
                      placeholder="street"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="block w-full" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      className="p-1 relative rounded-sm"
                      placeholder="city"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="block w-full" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Postal code</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="p-1 relative rounded-sm"
                      placeholder="postal code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="block w-full" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      className="p-1 relative rounded-sm"
                      placeholder="Country"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="block w-full" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="p-1 relative rounded-sm"
                      placeholder="Phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="block w-full" />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex md:justify-end">
            <Button
              type="submit"
              loadingText={pendingCheck || pendingRegisterData ? "loading" : ""}
              disabled={pendingCheck || pendingRegisterData}
              isLoading={pendingCheck || pendingRegisterData}
              className="px-4 sm:px-6 lg:px-8"
            >
              Continue checkout{" "}
              <ArrowRight className=" h-4 w-4 ml-1.5 inline" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
