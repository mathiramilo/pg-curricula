import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils";
import { CalendarTimeIcon } from "./icons";

type ComingSoonProps = ComponentPropsWithoutRef<"div"> & {
  message?: string;
};

export const ComingSoon = ({
  message,
  className,
  ...props
}: ComingSoonProps) => {
  return (
    <div
      className={cn("h-1/3 flex items-center justify-center p-8", className)}
      {...props}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <CalendarTimeIcon className="stroke-fuente-secundario" />
        <p className="text-fuente-secundario w-2/3 font-light text-sm text-center">
          {message ??
            "Estamos trabajando para que puedas utilizar esta funcionalidad a la brevedad."}
        </p>
      </div>
    </div>
  );
};
