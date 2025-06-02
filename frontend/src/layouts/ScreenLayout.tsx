import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils";

type ScreenLayoutProps = ComponentPropsWithoutRef<"main">;

export const ScreenLayout = ({ className, ...props }: ScreenLayoutProps) => (
  <main
    className={cn(
      "h-[calc(100dvh-64px)] w-full p-5 overflow-y-scroll pb-32 sm:pb-5 flex flex-col gap-8",
      className,
    )}
    {...props}
  />
);
