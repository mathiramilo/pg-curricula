import type { ComponentPropsWithoutRef } from "react";

import { Switch } from "@/components";
import { cn } from "@/utils";

type SwitchFieldProps = ComponentPropsWithoutRef<typeof Switch> & {
  containerClassName?: string;
  label?: string;
};

export const SwitchField = ({
  containerClassName,
  label,
  id,
  ...props
}: SwitchFieldProps) => {
  return (
    <div className={cn("flex items-center gap-2", containerClassName)}>
      <Switch id={id} {...props} />
      <label htmlFor={id} className="text-sm xl:w-52">
        {label}
      </label>
    </div>
  );
};
