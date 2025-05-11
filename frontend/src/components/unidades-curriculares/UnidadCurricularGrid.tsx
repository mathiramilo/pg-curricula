import type { ComponentPropsWithoutRef } from "react";
import React from "react";

import type { UnidadCurricular, UnidadCurricularItemType } from "@/models";
import { cn } from "@/utils";
import { MemoizedUnidadCurricularItem } from "./UnidadCurricularItem";

type UnidadCurricularGridProps = ComponentPropsWithoutRef<"div"> & {
  unidadesCurriculares: UnidadCurricular[];
  titulo?: string;
  rightElement?: React.ReactNode;
  type?: UnidadCurricularItemType;
};

const UnidadCurricularGrid = ({
  unidadesCurriculares,
  titulo,
  rightElement,
  type = "aprobacion",
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
            key={unidadCurricular.codigo}
            unidadCurricular={unidadCurricular}
            type={type}
          />
        ))}
      </div>
    </div>
  );
};

export const MemoizedUnidadCurricularGrid = React.memo(UnidadCurricularGrid);
