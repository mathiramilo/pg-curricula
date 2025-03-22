import { useQuery } from "react-query";

import { DOMINIO_PREVIAS, getPrevias } from "@/api";
import type { UnidadCurricular } from "@/models";

export const usePrevias = (
  codigoEnServicioUC?: UnidadCurricular["codigoEnServicioUC"],
) => {
  return useQuery({
    queryKey: [DOMINIO_PREVIAS, codigoEnServicioUC],
    queryFn: () => getPrevias(codigoEnServicioUC),
    enabled: Boolean(codigoEnServicioUC),
  });
};
