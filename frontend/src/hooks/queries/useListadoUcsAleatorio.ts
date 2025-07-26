import { useQuery } from "@tanstack/react-query";

import { DOMINIO_PLANES, getListadoUCsAleatorio } from "@/api";
import type { InformacionEstudiante } from "@/models";

interface UseListadoUCsAleatorioParams {
  informacionEstudiante: InformacionEstudiante;
}

export const useListadoUcsAleatorio = ({
  informacionEstudiante,
}: UseListadoUCsAleatorioParams) => {
  return useQuery({
    queryKey: [DOMINIO_PLANES, "listado-aleatorio"], // eslint-disable-line
    queryFn: () => getListadoUCsAleatorio(informacionEstudiante),
  });
};
