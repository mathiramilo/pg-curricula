import { useMutation } from "react-query";

import { satisfacePreviaturas } from "@/api";
import type { UnidadCurricular } from "@/models";

export const useSatisfacePrevias = () => {
  return useMutation({
    mutationFn: (codigo: UnidadCurricular["codigo"]) =>
      satisfacePreviaturas(codigo),
  });
};
