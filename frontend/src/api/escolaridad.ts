import { api } from "./axios";

export const procesarEscolaridad = async (formData: FormData) => {
  const res = await api.post("/escolaridad/procesar-escolaridad", formData);
  return res.data;
};
