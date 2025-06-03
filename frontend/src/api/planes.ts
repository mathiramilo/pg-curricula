import type { ScheduleObject, SemestreDeDictado } from "@/models";
import { useInformacionEstudianteStore } from "@/store";
import { api } from "./axios";

export const DOMINIO_PLANES = "planes";

export interface GeneratePlanParams {
  creditosPorSemestre: number;
  semestreInicial: SemestreDeDictado;
}

export const generatePlan = async ({
  creditosPorSemestre,
  semestreInicial,
}: GeneratePlanParams) => {
  const informacionEstudiante =
    useInformacionEstudianteStore.getState().informacionEstudiante;

  const res = await api.post<ScheduleObject[]>("/planes", {
    informacionEstudiante,
    creditosPorSemestre,
    semestreInicial,
  });

  return res.data;
};
