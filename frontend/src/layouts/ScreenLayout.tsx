import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib";

type ScreenLayoutProps = ComponentPropsWithoutRef<"main">;

export const ScreenLayout = ({ className, ...props }: ScreenLayoutProps) => (
  <main
    className={cn(
      "h-[calc(100%-64px)] w-full p-5 overflow-y-scroll",
      className,
    )}
    {...props}
  />
);
