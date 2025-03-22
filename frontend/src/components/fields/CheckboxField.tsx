import type { ComponentPropsWithoutRef } from "react";
import React from "react";

import { Checkbox } from "@/components";
import { cn } from "@/utils";

type CheckboxFieldProps = ComponentPropsWithoutRef<typeof Checkbox> & {
  containerClassName?: string;
  label?: string;
};

export const CheckboxField = ({
  containerClassName,
  label,
  id,
  ...props
}: CheckboxFieldProps) => {
  return (
    <div className={cn("flex items-center gap-2", containerClassName)}>
      <Checkbox id={id} {...props} />

      <label htmlFor={id} className="text-sm">
        {label}
      </label>
    </div>
  );
};
