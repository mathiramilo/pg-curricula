import type { ComponentPropsWithoutRef } from "react";
import React from "react";

import type { UnidadCurricular } from "@/models";
import { cn } from "@/utils";
import { MemoizedUnidadCurricularItem } from "./UnidadCurricularItem";

type UnidadCurricularGridProps = ComponentPropsWithoutRef<"div"> & {
  unidadesCurriculares: UnidadCurricular[];
  titulo?: string;
  rightElement?: React.ReactNode;
};

const UnidadCurricularGrid = ({
  unidadesCurriculares,
  titulo,
  rightElement,
  className,
  ...props
}: UnidadCurricularGridProps) => {
  return (
    <div className={cn("w-full flex flex-col gap-4", className)} {...props}>
      <div className="flex items-center justify-between gap-2">
        {titulo && <h2 className="text-lg font-medium">{titulo}</h2>}
        {rightElement}
      </div>

      <div className="w-full grid lg:grid-cols-3 gap-x-12 gap-y-2">
        {unidadesCurriculares.map((unidadCurricular) => (
          <MemoizedUnidadCurricularItem
            key={unidadCurricular.codigoEnServicioUC}
            unidadCurricular={unidadCurricular}
          />
        ))}
      </div>
    </div>
  );
};

export const MemoizedUnidadCurricularGrid = React.memo(UnidadCurricularGrid);
