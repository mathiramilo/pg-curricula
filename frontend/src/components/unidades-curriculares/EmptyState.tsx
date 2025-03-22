import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils";
import { AlertTriangleIcon } from "../icons";

type EmptyStateProps = ComponentPropsWithoutRef<"div"> & {
  message?: string;
};

export const EmptyState = ({
  message,
  className,
  ...props
}: EmptyStateProps) => {
  return (
    <div
      className={cn("h-1/3 flex items-center justify-center p-8", className)}
      {...props}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <AlertTriangleIcon className="stroke-fuente-secundario" />
        <p className="text-fuente-secundario w-2/3 font-light text-sm text-center">
          {message ??
            "No se encontraron unidades curriculares que coincidan con la búsqueda."}
        </p>
      </div>
    </div>
  );
};
