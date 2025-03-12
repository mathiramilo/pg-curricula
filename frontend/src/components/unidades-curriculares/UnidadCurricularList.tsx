import type { ComponentPropsWithoutRef } from "react";

import type { UnidadCurricular } from "@/models";
import { cn } from "@/utils";
import { UnidadCurricularItem } from "./UnidadCurricularItem";

type UnidadCurricularListProps = ComponentPropsWithoutRef<"div"> & {
  unidadesCurriculares: UnidadCurricular[];
  titulo?: string;
};

export const UnidadCurricularList = ({
  unidadesCurriculares,
  titulo,
  className,
  ...props
}: UnidadCurricularListProps) => {
  return (
    <div className={cn("w-full flex flex-col gap-4", className)} {...props}>
      {titulo && <h2 className="text-lg font-medium">{titulo}</h2>}
      <div className="w-full flex flex-col gap-2">
        {unidadesCurriculares.map((unidadCurricular) => (
          <UnidadCurricularItem
            key={unidadCurricular.codigoEnServicioUC}
            unidadCurricular={unidadCurricular}
          />
        ))}
      </div>
    </div>
  );
};
