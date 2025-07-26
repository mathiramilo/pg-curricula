import { useQuery } from "react-query";

import { DOMINIO_PREVIATURAS, satisfacePreviaturas } from "@/api";
import type { InformacionEstudiante, UnidadCurricular } from "@/models";

interface UseSatisfacePreviaturasProps {
  informacionEstudiante: InformacionEstudiante;
  codigo: UnidadCurricular["codigo"];
}

export const useSatisfacePreviaturas = ({
  informacionEstudiante,
  codigo,
}: UseSatisfacePreviaturasProps) => {
  return useQuery({
    queryKey: [DOMINIO_PREVIATURAS, informacionEstudiante, codigo],
    queryFn: () => satisfacePreviaturas(informacionEstudiante, codigo),
  });
};
