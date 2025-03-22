import type {
  SemestreDeDictado,
  TrayectoriaSugeridaSemestre,
  UnidadCurricular,
} from "@/models";
import { useStore } from "@/store";
import { api } from "./axios";

export const DOMINIO_UNIDADES_CURRICULARES = "unidades-curriculares";

export interface GetUnidadesCurricularesFilter {
  nombre?: string;
  grupo?: string;
  minCreditos?: number;
  maxCreditos?: number;
  habilitadas?: boolean;
  semestresDeDictado?: SemestreDeDictado[];
}

export const getUnidadesCurriculares = async (
  filter: GetUnidadesCurricularesFilter,
) => {
  const informacionEstudiante = useStore.getState().informacionEstudiante;

  const res = await api.post<UnidadCurricular[]>(
    "/unidades-curriculares",
    { informacionEstudiante },
    {
      params: {
        ...filter,
        semestresDeDictado: JSON.stringify(filter.semestresDeDictado),
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
