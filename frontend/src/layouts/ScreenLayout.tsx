import { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib";

type ScreenLayoutProps = ComponentPropsWithoutRef<"main">;

export const ScreenLayout = ({ className, ...props }: ScreenLayoutProps) => (
  <main className={cn("h-full w-full p-5", className)} {...props} />
);
