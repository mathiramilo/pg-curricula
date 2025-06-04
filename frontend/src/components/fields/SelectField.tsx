import type { ComponentPropsWithoutRef } from "react";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components";
import type { Option } from "@/models";
import { cn } from "@/utils";

type SelectFieldProps = ComponentPropsWithoutRef<typeof Select> & {
  options: Option[];
  containerClassName?: string;
  label?: string;
  id?: string;
  placeholder?: string;
};

export const SelectField = ({
  options,
  containerClassName,
  label,
  id,
  placeholder,
  ...props
}: SelectFieldProps) => {
  return (
    <div className={cn("flex flex-col gap-1.5", containerClassName)}>
      <label htmlFor={id} className="text-fuente-principal text-sm">
        {label}
      </label>

      <Select {...props}>
        <SelectTrigger id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
