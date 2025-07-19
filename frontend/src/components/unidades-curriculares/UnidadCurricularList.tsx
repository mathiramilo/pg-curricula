import type { ComponentPropsWithoutRef } from "react";

import type { UnidadCurricular, UnidadCurricularItemType, } from "@/models";
import { REQUISITOS_TITULO } from "@/models";
import { cn } from "@/utils";
import { MemoizedUnidadCurricularItem } from "./UnidadCurricularItem";

type UnidadCurricularListProps = ComponentPropsWithoutRef<"div"> & {
  unidadesCurriculares: UnidadCurricular[];
  titulo?: string;
  type?: UnidadCurricularItemType;
  selectedUcs?: string[];
  onToggleSelect?: (uc: UnidadCurricular, selected: boolean) => void;
  mostrarCreditosGrupo?: boolean;
};

export const UnidadCurricularList = ({
  unidadesCurriculares,
  titulo,
  type = "aprobacion",
  selectedUcs,
  onToggleSelect,
  className,
  mostrarCreditosGrupo,
  ...props
}: UnidadCurricularListProps) => {
  const creditosSeleccionados = selectedUcs
  ? unidadesCurriculares
      .filter((uc) => selectedUcs.includes(uc.codigo))
      .reduce((sum, uc) => sum + uc.creditos, 0)
  : 0;

  const grupo = unidadesCurriculares[0]?.nombreGrupoHijo; // asumimos que todas las UCs del bloque son del mismo grupo

  return (
    <div className={cn("w-full flex flex-col gap-4", className)} {...props}>
    {titulo && (
      <h2 className="text-lg font-medium flex justify-between items-center">
        {titulo}
        {type == "seleccion" && grupo && (
          <span
            className={cn(
              "text-sm font-semibold",
              creditosSeleccionados >= REQUISITOS_TITULO[grupo]
                ? "text-green-600"
                : "text-red-500"
            )}
          >
            {creditosSeleccionados} / {REQUISITOS_TITULO[grupo]}
          </span>
        )}
      </h2>
    )}


      <div className="w-full flex flex-col gap-2 max-h-64 overflow-y-auto pr-2">
        {unidadesCurriculares.map((unidadCurricular) => (
          <MemoizedUnidadCurricularItem
            key={unidadCurricular.codigo}
            unidadCurricular={unidadCurricular}
            type={type}
            selected={selectedUcs?.includes(unidadCurricular.codigo)}
            onSelectChange={onToggleSelect}
          />
        ))}
      </div>
    </div>
  );
};
