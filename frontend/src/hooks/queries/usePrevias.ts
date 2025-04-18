import { useQuery } from "react-query";

import { DOMINIO_PREVIAS, getPrevias } from "@/api";
import type { UnidadCurricular } from "@/models";

export const usePrevias = (codigo?: UnidadCurricular["codigo"]) => {
  return useQuery({
    queryKey: [DOMINIO_PREVIAS, codigo],
    queryFn: () => getPrevias(codigo),
    enabled: Boolean(codigo),
  });
};
