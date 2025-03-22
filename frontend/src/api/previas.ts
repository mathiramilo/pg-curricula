import type { ReglaPreviaturas, UnidadCurricular } from "@/models";
import { useInformacionEstudianteStore } from "@/store";
import { api } from "./axios";

export const DOMINIO_PREVIAS = "previas";

export const getPrevias = async (
  codigoEnServicioUC?: UnidadCurricular["codigoEnServicioUC"],
) => {
  const res = await api.get<ReglaPreviaturas>(`/previas/${codigoEnServicioUC}`);

  return res.data;
};

export const satisfacePrevias = async (
  codigoEnServicioUC: UnidadCurricular["codigoEnServicioUC"],
) => {
  const informacionEstudiante =
    useInformacionEstudianteStore.getState().informacionEstudiante;

  const res = await api.post<boolean>(
    `/previas/${codigoEnServicioUC}/satisface`,
    { informacionEstudiante },
  );

  return res.data;
};
