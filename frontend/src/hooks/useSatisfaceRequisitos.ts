import { useMemo } from "react";

import type { InformacionEstudiante } from "@/models";
import { GRUPO_VALUES, REQUISITOS_TITULO } from "@/models";

export const useSatisfaceRequisitos = (
  informacionEstudiante: InformacionEstudiante,
) => {
  return useMemo(() => {
    const satisfaceCreditosTotales =
      informacionEstudiante.creditosTotales >=
      REQUISITOS_TITULO.CREDITOS_TOTALES;

    const satisfaceCreditosPorGrupo = GRUPO_VALUES.map(
      (grupo) => informacionEstudiante[grupo] >= REQUISITOS_TITULO[grupo],
    ).every(Boolean);

    const satisfaceRequisitos =
      satisfaceCreditosTotales && satisfaceCreditosPorGrupo;

    return {
      satisfaceCreditosTotales,
      satisfaceCreditosPorGrupo,
      satisfaceRequisitos,
    };
  }, [informacionEstudiante]);
};
