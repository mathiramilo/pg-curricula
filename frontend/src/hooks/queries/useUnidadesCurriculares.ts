import { useRef } from "react";
import { useQuery } from "react-query";

import type { GetUnidadesCurricularesFilter } from "@/api";
import { DOMINIO_UNIDADES_CURRICULARES, getUnidadesCurriculares } from "@/api";

export const useUnidadesCurriculares = (
  filter: GetUnidadesCurricularesFilter,
) => {
  const queryResult = useQuery({
    queryKey: [DOMINIO_UNIDADES_CURRICULARES, filter],
    queryFn: () => getUnidadesCurriculares(filter),
  });

  const { data, ...rest } = queryResult;
  const stableDataRef = useRef(data);

  if (JSON.stringify(stableDataRef.current) !== JSON.stringify(data)) {
    stableDataRef.current = data;
  }

  return { data: stableDataRef.current, ...rest };
};
