import { useMemo } from "react";

import type { InformacionEstudiante } from "@/models";
import { GRUPO_VALUES, REQUISITOS_TITULO } from "@/models";
import { capitalizeWords } from "@/utils";

const PROGRAMACION_FUNCIONAL_OR_LOGICA = [
  { nombre: "PROGRAMACION FUNCIONAL", codigo: "1354" },
  { nombre: "PROGRAMACION LOGICA", codigo: "1340" },
] as const;

export const useSatisfaceRequisitos = (
  informacionEstudiante: InformacionEstudiante,
) => {
  return useMemo(() => {
    const errors = [];

    const satisfaceCreditosTotales =
      informacionEstudiante.creditosTotales >=
      REQUISITOS_TITULO.CREDITOS_TOTALES;

    if (!satisfaceCreditosTotales)
      errors.push(
        `Te faltan ${REQUISITOS_TITULO.CREDITOS_TOTALES - informacionEstudiante.creditosTotales} créditos totales.`,
      );

    const satisfaceCreditosPorGrupo = GRUPO_VALUES.map((grupo) => {
      const satisface =
        informacionEstudiante[grupo] >= REQUISITOS_TITULO[grupo];

      if (!satisface)
        errors.push(
          `Te faltan ${REQUISITOS_TITULO[grupo] - informacionEstudiante[grupo]} créditos en el grupo ${capitalizeWords(grupo)}.`,
        );

      return satisface;
    }).every(Boolean);

    const hasProgramacionFuncionalOrLogica =
      PROGRAMACION_FUNCIONAL_OR_LOGICA.some((uc) =>
        Object.hasOwn(
          informacionEstudiante.unidadesCurricularesAprobadas,
          uc.codigo,
        ),
      );

    if (!hasProgramacionFuncionalOrLogica)
      errors.push(
        `Debes seleccionar al menos uno de los siguientes cursos: ${PROGRAMACION_FUNCIONAL_OR_LOGICA.map(
          (uc) => capitalizeWords(uc.nombre),
        ).join(" o ")}.`,
      );

    const satisfaceRequisitos =
      satisfaceCreditosTotales &&
      satisfaceCreditosPorGrupo &&
      hasProgramacionFuncionalOrLogica;

    return {
      satisfaceCreditosTotales,
      satisfaceCreditosPorGrupo,
      hasProgramacionFuncionalOrLogica,
      satisfaceRequisitos,
      errors,
    };
  }, [informacionEstudiante]);
};
