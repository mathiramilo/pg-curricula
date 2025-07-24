import { useQuery } from "react-query";

import type { GetUnidadesCurricularesFilter } from "@/api";
import { DOMINIO_UNIDADES_CURRICULARES, getUnidadesCurriculares } from "@/api";

interface UseUnidadesCurricularesParams {
  filter: GetUnidadesCurricularesFilter;
  page: number;
  pageSize?: number;
}

export const useUnidadesCurriculares = ({
  filter,
  page,
  pageSize,
}: UseUnidadesCurricularesParams) => {
  return useQuery({
    queryKey: [DOMINIO_UNIDADES_CURRICULARES, filter, page, pageSize],
    queryFn: () => getUnidadesCurriculares(filter, page, pageSize),
  });
};
