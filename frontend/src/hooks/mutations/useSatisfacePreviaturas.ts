import { useMutation } from "react-query";

import { satisfacePreviaturas } from "@/api";
import type { InformacionEstudiante, UnidadCurricular } from "@/models";

export const useSatisfacePreviaturas = () => {
  return useMutation({
    mutationFn: ({
      informacionEstudiante,
      codigo,
    }: {
      informacionEstudiante: InformacionEstudiante;
      codigo: UnidadCurricular["codigo"];
    }) => satisfacePreviaturas(informacionEstudiante, codigo),
  });
};
