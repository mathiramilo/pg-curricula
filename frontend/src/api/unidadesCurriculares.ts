import type { TrayectoriaSugeridaSemestre, UnidadCurricular } from "@/models";
import type { Store } from "@/store";
import { api } from "./axios";

export const DOMINIO_UNIDADES_CURRICULARES = "unidades-curriculares";

export interface GetUnidadesCurricularesFilter {
  nombre?: string;
  grupo?: string;
  minCreditos?: number;
  maxCreditos?: number;
  habilitadas?: boolean;
}

export const getUnidadesCurriculares = async (
  filter: GetUnidadesCurricularesFilter,
) => {
  const store = JSON.parse(localStorage.getItem("store") ?? "") as {
    state: Store;
  };

  const informacionEstudiante = store.state.informacionEstudiante;

  const res = await api.post<UnidadCurricular[]>(
    "/unidades-curriculares",
    { informacionEstudiante },
    {
      params: {
        ...filter,
      },
    },
  );

  return res.data;
};

export const getTrayectoriaSugerida = async () => {
  const res = await api.get<TrayectoriaSugeridaSemestre[]>(
    "/unidades-curriculares/trayectoria-sugerida",
  );

  return res.data;
};
