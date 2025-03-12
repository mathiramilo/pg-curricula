import { useQuery } from "react-query";

import { DOMINIO_UNIDADES_CURRICULARES, getTrayectoriaSugerida } from "@/api";

export const useTrayectoriaSugerida = () => {
  return useQuery({
    queryKey: [DOMINIO_UNIDADES_CURRICULARES, "trayectoria-sugerida"],
    queryFn: getTrayectoriaSugerida,
  });
};
