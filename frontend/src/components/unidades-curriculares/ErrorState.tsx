import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils";
import { AlertHexagonIcon } from "../icons";

type ErrorStateProps = ComponentPropsWithoutRef<"div">;

export const ErrorState = ({ className, ...props }: ErrorStateProps) => {
  return (
    <div
      className={cn("h-1/3 flex items-center justify-center p-8", className)}
      {...props}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <AlertHexagonIcon className="stroke-fuente-secundario" />
        <p className="text-fuente-secundario w-2/3 font-light text-sm text-center">
          Ha ocurrido un error inesperado, vuelve a intentarlo luego de unos
          minutos.
        </p>
      </div>
    </div>
  );
};
