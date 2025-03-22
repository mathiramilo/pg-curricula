import { useMutation } from "react-query";

import { satisfacePrevias } from "@/api";
import type { UnidadCurricular } from "@/models";

export const useSatisfacePrevias = () => {
  return useMutation({
    mutationFn: (codigoEnServicioUC: UnidadCurricular["codigoEnServicioUC"]) =>
      satisfacePrevias(codigoEnServicioUC),
  });
};
