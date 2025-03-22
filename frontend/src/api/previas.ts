import type { UnidadCurricular } from "@/models";
import { useStore } from "@/store";
import { api } from "./axios";

export const satisfacePrevias = async (
  codigoEnServicioUC: UnidadCurricular["codigoEnServicioUC"],
) => {
  const informacionEstudiante = useStore.getState().informacionEstudiante;

  const res = await api.post<boolean>(
    `/previas/${codigoEnServicioUC}/satisface`,
    { informacionEstudiante },
  );

  return res.data;
};
