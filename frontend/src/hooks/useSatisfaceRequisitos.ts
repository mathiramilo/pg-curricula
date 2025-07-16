import { useMemo } from "react";

import { GRUPO_VALUES, REQUISITOS_TITULO } from "@/models";
import { useInformacionEstudianteStore } from "@/store";

export const useSatisfaceRequisitos = () => {
  const informacionEstudiante = useInformacionEstudianteStore(
    (state) => state.informacionEstudiante,
  );

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
