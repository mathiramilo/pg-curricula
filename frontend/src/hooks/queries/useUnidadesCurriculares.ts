import { useQuery } from "react-query";

import { DOMINIO_UNIDADES_CURRICULARES, getUnidadesCurriculares } from "@/api";

export const useUnidadesCurriculares = () => {
  return useQuery({
    queryKey: [DOMINIO_UNIDADES_CURRICULARES],
    queryFn: getUnidadesCurriculares,
  });
};
