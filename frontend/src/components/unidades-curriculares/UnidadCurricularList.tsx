import type { ComponentPropsWithoutRef } from "react";

import type { UnidadCurricular, UnidadCurricularItemType, } from "@/models";
import { REQUISITOS_TITULO } from "@/models";
import { cn } from "@/utils";
import { MemoizedUnidadCurricularItem } from "./UnidadCurricularItem";
import { useInformacionEstudianteStore } from "@/store";

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
  const ucsAprobadas = useInformacionEstudianteStore.getState().informacionEstudiante.unidadesCurricularesAprobadas;

  const creditosAprobadasNoIncluidas = Object.entries(ucsAprobadas)
    .filter(([_, uc]) => ucsAprobadas[uc.codigo]?.nombreGrupoHijo === unidadesCurriculares[0]?.nombreGrupoHijo)
    .reduce((sum, [, datos]) => sum + (datos.creditos || 0), 0);

  const creditosSeleccionados = unidadesCurriculares
    .filter((uc) => selectedUcs?.includes(uc.codigo) && !ucsAprobadas[uc.codigo])
    .reduce((sum, uc) => sum + uc.creditos, 0);
  const creditosSeleccionadosYAprobados = creditosSeleccionados + creditosAprobadasNoIncluidas;

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
              creditosSeleccionadosYAprobados >= REQUISITOS_TITULO[grupo]
                ? "text-green-600"
                : "text-red-500"
            )}
          >
            {creditosSeleccionadosYAprobados} / {REQUISITOS_TITULO[grupo]}
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
