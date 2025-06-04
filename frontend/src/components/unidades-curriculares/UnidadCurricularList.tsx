import type { ComponentPropsWithoutRef } from "react";

import type { UnidadCurricular, UnidadCurricularItemType } from "@/models";
import { cn } from "@/utils";
import { MemoizedUnidadCurricularItem } from "./UnidadCurricularItem";

type UnidadCurricularListProps = ComponentPropsWithoutRef<"div"> & {
  unidadesCurriculares: UnidadCurricular[];
  titulo?: string;
  type?: UnidadCurricularItemType;
};

export const UnidadCurricularList = ({
  unidadesCurriculares,
  titulo,
  type = "aprobacion",
  className,
  ...props
}: UnidadCurricularListProps) => {
  return (
    <div className={cn("w-full flex flex-col gap-4", className)} {...props}>
      {titulo && <h2 className="text-lg font-medium">{titulo}</h2>}
      <div className="w-full flex flex-col gap-2">
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
