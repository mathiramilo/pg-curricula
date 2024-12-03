import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib";

type ScreenHeaderProps = ComponentPropsWithoutRef<"header"> & {
  title: string;
};

export const ScreenHeader = ({
  title,
  className,
  children,
  ...props
}: ScreenHeaderProps) => (
  <header
    className={cn("flex flex-col gap-4 border-b border-borde pb-4", className)}
    {...props}
  >
    <h1 className="text-2xl font-medium">{title}</h1>
    {children}
  </header>
);
