import type { UnidadCurricular } from "@/models";
import type { Store } from "@/store";
import { api } from "./axios";

export const satisfacePrevias = async (
  codigoEnServicioUC: UnidadCurricular["codigoEnServicioUC"],
) => {
  const store = JSON.parse(localStorage.getItem("store") ?? "") as {
    state: Store;
  };

  const informacionEstudiante = store.state.informacionEstudiante;

  console.log(informacionEstudiante);

  const res = await api.post<boolean>(
    `/previas/${codigoEnServicioUC}/satisface`,
    { informacionEstudiante },
  );

  return res.data;
};
