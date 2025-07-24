import { useQuery } from "react-query";

import {
  DOMINIO_UNIDADES_CURRICULARES,
  getUnidadesCurricularesObligatorias,
} from "@/api";

export const useUnidadesCurricularesObligatorias = () => {
  return useQuery({
    queryKey: [DOMINIO_UNIDADES_CURRICULARES],
    queryFn: () => getUnidadesCurricularesObligatorias(),
  });
};
