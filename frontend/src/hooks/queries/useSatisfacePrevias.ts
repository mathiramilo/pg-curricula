import { useMutation } from "react-query";

import { satisfacePrevias } from "@/api";
import type { UnidadCurricular } from "@/models";

export const useSatisfacePrevias = () => {
  return useMutation({
    mutationFn: (codigo: UnidadCurricular["codigo"]) =>
      satisfacePrevias(codigo),
  });
};
