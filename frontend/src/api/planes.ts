import type { PlanCarrera, SemestreDeDictado, UnidadCurricular } from "@/models";
import { useInformacionEstudianteStore } from "@/store";
import { api } from "./axios";

export const DOMINIO_PLANES = "planes";

export interface GeneratePlanParams {
  creditosPorSemestre: number;
  semestreInicial: SemestreDeDictado;
  listadoUcs: UnidadCurricular[];
}

export const generatePlan = async ({
  creditosPorSemestre,
  semestreInicial,
  listadoUcs,
}: GeneratePlanParams) => {
  const informacionEstudiante =
    useInformacionEstudianteStore.getState().informacionEstudiante;

  const res = await api.post<PlanCarrera>("/planes", {
    informacionEstudiante,
    creditosPorSemestre,
    semestreInicial,
    listadoUcs,
  });

  return res.data;
};

export const getListadoUCsAleatorio = async () => {
  const informacionEstudiante =
    useInformacionEstudianteStore.getState().informacionEstudiante;

  const res = await api.post<UnidadCurricular[]>(
    "/planes/generar-listado",
    { informacionEstudiante },
  );

  return res.data;
}
