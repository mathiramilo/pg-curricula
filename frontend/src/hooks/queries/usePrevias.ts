import { useQuery } from "react-query";

import { DOMINIO_PREVIATURAS, getPreviaturas } from "@/api";
import type { UnidadCurricular } from "@/models";

export const usePrevias = (codigo?: UnidadCurricular["codigo"]) => {
  return useQuery({
    queryKey: [DOMINIO_PREVIATURAS, codigo],
    queryFn: () => getPreviaturas(codigo),
    enabled: Boolean(codigo),
  });
};
