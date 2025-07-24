import type {
  SemestreDeDictado,
  TrayectoriaSugeridaSemestre,
  UnidadCurricular,
} from "@/models";
import { useInformacionEstudianteStore } from "@/store";
import type { PaginatedResponse } from "./axios";
import { api } from "./axios";

export const DOMINIO_UNIDADES_CURRICULARES = "unidades-curriculares";

export interface GetUnidadesCurricularesFilter {
  search?: string;
  grupo?: string;
  minCreditos?: number;
  maxCreditos?: number;
  semestresDeDictado?: SemestreDeDictado[];
  habilitadas?: boolean;
  aprobadas?: boolean;
}

type GetUnidadesCurricularesResponse = PaginatedResponse<UnidadCurricular[]>;

export const getUnidadesCurriculares = async (
  filter: GetUnidadesCurricularesFilter,
  page: number,
  pageSize?: number,
) => {
  const informacionEstudiante =
    useInformacionEstudianteStore.getState().informacionEstudiante;

  const res = await api.post<GetUnidadesCurricularesResponse>(
    "/unidades-curriculares",
    { informacionEstudiante },
    {
      params: {
        ...filter,
        semestresDeDictado: JSON.stringify(filter.semestresDeDictado),
        page,
        pageSize,
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

export const getUnidadesCurricularesObligatorias = async () => {
  const res = await api.get<UnidadCurricular[]>(
    "/unidades-curriculares/obligatorias",
  );

  return res.data;
};
