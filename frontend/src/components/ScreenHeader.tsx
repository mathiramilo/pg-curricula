import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils";

type ScreenHeaderProps = ComponentPropsWithoutRef<"header"> & {
  title: string;
  rightElement?: React.ReactNode;
};

export const ScreenHeader = ({
  title,
  rightElement,
  className,
  children,
  ...props
}: ScreenHeaderProps) => (
  <header
    className={cn(
      "w-full flex flex-col gap-4 border-b border-borde pb-4",
      className,
    )}
    {...props}
  >
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-medium">{title}</h1>
      {rightElement}
    </div>
    {children}
  </header>
);
