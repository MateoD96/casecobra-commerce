"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import NextImage from "next/image";
import { Rnd } from "react-rnd";
import { useState } from "react";
import HandleComponent from "@/components/HandleComponent";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, Radio } from "@headlessui/react";
import { COLORS } from "@/validators/option-validator";
import { Label } from "@/components/ui/label";

interface DesignConfiguratorProps {
  configId: string;
  imageUrl: string;
  dimensions: {
    width: number;
    height: number;
  };
}

export default function DesignConfigurator({
  configId,
  imageUrl,
  dimensions,
}: DesignConfiguratorProps) {
  const [options, setOptions] = useState<{ color: (typeof COLORS)[number] }>({
    color: COLORS[0],
  });

  return (
    <div className=" relative mt-20 grid grid-cols-1 md:grid-cols-3 mb-20 pb-20 ">
      <div
        className=" relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl
       flex items-center justify-center rounded-lg border-2 border-dashed
        border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <div className=" relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
          <AspectRatio
            ratio={896 / 1831}
            className=" pointer-events-none relative z-50 aspect-[896/1831] w-full"
          >
            <NextImage
              src="/phone-template.png"
              className=" pointer-events-none z-50 select-none"
              alt="Phone Image"
              fill
            />
          </AspectRatio>
          <div
            className=" absolute z-40 inset-0 left-[3px] top-px right-[3px]
           bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]"
          />
          <div
            className={cn(
              " absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]",
              `bg-${options.color.tw}`
            )}
          />
        </div>

        <Rnd
          default={{
            x: 150,
            y: 205,
            height: dimensions.height / 4,
            width: dimensions.width / 4,
          }}
          className=" absolute z-20 border-[3px] border-primary"
          lockAspectRatio
          resizeHandleComponent={{
            bottomRight: <HandleComponent />,
            bottomLeft: <HandleComponent />,
            topRight: <HandleComponent />,
            topLeft: <HandleComponent />,
          }}
        >
          <div className=" relative w-full h-full">
            <NextImage
              src={imageUrl}
              alt="Your image phone"
              fill
              className=" pointer-events-none"
            />
          </div>
        </Rnd>
      </div>

      <div className=" h-[37.5rem] flex flex-col bg-white -order-1 md:order-1">
        <ScrollArea className="relative flex-1 overflow-auto">
          <div
            aria-hidden={true}
            className=" absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
          />
          <div className="px-8 pb-12 pt-8">
            <h2 className=" tracking-tight font-bold text-3xl">
              Customize your case
            </h2>
            <div className="w-full h-px bg-zinc-200 my-6" />

            <div className="relative mt-4 h-full flex flex-col justify-between">
              <RadioGroup
                value={options.color}
                onChange={(value) =>
                  setOptions((prev) => ({ ...prev, color: value }))
                }
              >
                <Label>Color: {options.color.label}</Label>
                <div className="mt-3 flex items-center space-x-3">
                  {COLORS.map((color) => (
                    <Radio
                      key={color.label}
                      value={color}
                      className={({ checked }) =>
                        cn(
                          "relative -m-0.5 cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent",
                          {
                            [`border-${color.tw}`]: checked,
                          }
                        )
                      }
                    >
                      <span
                        className={cn(
                          `bg-${color.tw}`,
                          "block h-8 w-8 rounded-full border border-black border-opacity-10"
                        )}
                      />
                    </Radio>
                  ))}
                </div>
              </RadioGroup>

              <div className=" relative flex flex-col gap-3 w-full"></div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
