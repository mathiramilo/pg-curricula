import { useQuery } from "react-query";

import type { GetUnidadesCurricularesFilter } from "@/api";
import { DOMINIO_UNIDADES_CURRICULARES, getUnidadesCurriculares } from "@/api";

export const useUnidadesCurriculares = (
  filter: GetUnidadesCurricularesFilter,
  page: number,
) => {
  return useQuery({
    queryKey: [DOMINIO_UNIDADES_CURRICULARES, filter, page],
    queryFn: () => getUnidadesCurriculares(filter, page),
  });
};
