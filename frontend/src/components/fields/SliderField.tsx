import type { ComponentPropsWithoutRef } from "react";

import { Slider } from "@/components";
import { cn } from "@/utils";

type SliderFieldProps = ComponentPropsWithoutRef<typeof Slider> & {
  containerClassName?: string;
  title?: string;
  leftLabel?: string;
  rightLabel?: string;
};

export const SliderField = ({
  containerClassName,
  title,
  leftLabel,
  rightLabel,
  ...props
}: SliderFieldProps) => {
  return (
    <div
      className={cn(
        "w-full flex flex-col gap-2 xl:flex-row xl:items-center",
        containerClassName,
      )}
    >
      <span className="text-sm text-fuente-principal xl:w-44">{title}</span>

      <div className="w-full flex items-center gap-1">
        <span className="text-sm text-fuente-principal">{leftLabel}</span>

        <Slider {...props} />

        <span className="text-sm text-fuente-principal">{rightLabel}</span>
      </div>
    </div>
  );
};
