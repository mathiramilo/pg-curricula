import { useQuery } from "react-query";

import { DOMINIO_PLANES, getListadoUCsInicial } from "@/api";
import type { InformacionEstudiante } from "@/models";

interface UseListadoUCsInicialParams {
  informacionEstudiante: InformacionEstudiante;
}

export const useListadoUcsInicial = ({
  informacionEstudiante,
}: UseListadoUCsInicialParams) => {
  return useQuery({
    queryKey: [DOMINIO_PLANES, "listado-inicial"], // eslint-disable-line
    queryFn: () => getListadoUCsInicial(informacionEstudiante),
  });
};
