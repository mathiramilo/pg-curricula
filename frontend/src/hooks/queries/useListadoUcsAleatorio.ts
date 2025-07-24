import { useQuery } from "react-query";

import { DOMINIO_UNIDADES_CURRICULARES, getListadoUCsAleatorio } from "@/api";
import type { InformacionEstudiante } from "@/models";

interface UseListadoUCsAleatorioParams {
  informacionEstudiante: InformacionEstudiante;
}

export const useListadoUcsAleatorio = ({
  informacionEstudiante,
}: UseListadoUCsAleatorioParams) => {
  return useQuery({
    queryKey: [DOMINIO_UNIDADES_CURRICULARES, informacionEstudiante],
    queryFn: () => getListadoUCsAleatorio(informacionEstudiante),
  });
};
