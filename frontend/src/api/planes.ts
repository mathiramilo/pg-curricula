import type { ScheduleObject } from "@/models";
import { useInformacionEstudianteStore } from "@/store";
import { api } from "./axios";

export const DOMINIO_PLANES = "planes";

export const generatePlan = async (creditosPorSemestre: number) => {
  const informacionEstudiante =
    useInformacionEstudianteStore.getState().informacionEstudiante;

  const res = await api.post<ScheduleObject[]>("/planes", {
    informacionEstudiante,
    creditosPorSemestre,
  });

  return res.data;
};
