import { useMutation } from "react-query";

import { satisfacePreviaturas } from "@/api";
import type { InformacionEstudiante, UnidadCurricular } from "@/models";

type satisfacePreviaturasParams = {
  codigo: UnidadCurricular["codigo"];
  informacionEstudianteTemporal: InformacionEstudiante;
};

export const useSatisfacePrevias = () => {
  return useMutation({
    mutationFn: ({ codigo, informacionEstudianteTemporal }: satisfacePreviaturasParams) =>
      satisfacePreviaturas(codigo, informacionEstudianteTemporal),
  });
};

