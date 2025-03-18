import { useQuery } from "react-query";

import { satisfacePrevias } from "@/api";
import type { UnidadCurricular } from "@/models";

export const useSatisfacePrevias = (
  codigoEnServicioUC: UnidadCurricular["codigoEnServicioUC"],
) => {
  return useQuery({
    queryFn: () => satisfacePrevias(codigoEnServicioUC),
  });
};
