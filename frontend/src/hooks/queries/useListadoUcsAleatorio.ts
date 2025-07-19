import { useQuery } from "react-query";

import { DOMINIO_UNIDADES_CURRICULARES, getListadoUCsAleatorio } from "@/api";

export const useListadoUcsAleatorio = () => {
  return useQuery({
    queryKey: [DOMINIO_UNIDADES_CURRICULARES],
    queryFn: () => getListadoUCsAleatorio(),
    enabled: Boolean(),
  });
};
