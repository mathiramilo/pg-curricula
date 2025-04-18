import type { ReglaPreviaturas, UnidadCurricular } from "@/models";
import { useInformacionEstudianteStore } from "@/store";
import { api } from "./axios";

export const DOMINIO_PREVIAS = "previas";

export const getPrevias = async (codigo?: UnidadCurricular["codigo"]) => {
  const res = await api.get<ReglaPreviaturas>(`/previas/${codigo}`);

  return res.data;
};

export const satisfacePrevias = async (codigo: UnidadCurricular["codigo"]) => {
  const informacionEstudiante =
    useInformacionEstudianteStore.getState().informacionEstudiante;

  const res = await api.post<boolean>(`/previas/${codigo}/satisface`, {
    informacionEstudiante,
  });

  return res.data;
};
