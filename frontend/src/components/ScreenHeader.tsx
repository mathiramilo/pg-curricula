import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils";

type ScreenHeaderProps = ComponentPropsWithoutRef<"header"> & {
  title: string;
  description?: string;
  rightElement?: React.ReactNode;
};

export const ScreenHeader = ({
  title,
  description,
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
    <div className="flex items-center justify-between gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-medium text-fuente-principal">{title}</h1>
        <p className="text-sm text-fuente-secundario">{description}</p>
      </div>
      {rightElement}
    </div>
    {children}
  </header>
);
