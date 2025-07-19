import type { InformacionEstudiante, ReglaPreviaturas, UnidadCurricular } from "@/models";
import { useInformacionEstudianteStore } from "@/store";
import { api } from "./axios";

export const DOMINIO_PREVIATURAS = "previaturas";

export const getPreviaturas = async (codigo?: UnidadCurricular["codigo"]) => {
  const res = await api.get<ReglaPreviaturas>(`/previaturas/${codigo}`);

  return res.data;
};

export const satisfacePreviaturas = async (
  codigo: UnidadCurricular["codigo"],
  informacionEstudianteTemporal?: InformacionEstudiante
) => {
  const informacionEstudiante = informacionEstudianteTemporal ? informacionEstudianteTemporal :
    useInformacionEstudianteStore.getState().informacionEstudiante;

  const res = await api.post<boolean>(`/previaturas/${codigo}/satisface`, {
    informacionEstudiante,
  });

  return res.data;
};
