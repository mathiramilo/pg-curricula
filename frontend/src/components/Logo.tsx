import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils";

type LogoProps = ComponentPropsWithoutRef<"div"> & {
  imgClassName?: string;
  textClassName?: string;
};

export const Logo = ({
  className,
  imgClassName,
  textClassName,
  ...props
}: LogoProps) => {
  return (
    <div
      className={cn("flex items-center gap-1.5 select-none", className)}
      {...props}
    >
      <img src="/fing.svg" alt="Logo" className={cn("size-6", imgClassName)} />
      <span
        className={cn(
          "font-poppins font-medium text-fuente-principal",
          textClassName,
        )}
      >
        Currícula+
      </span>
    </div>
  );
};
