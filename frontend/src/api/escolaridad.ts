import type { InformacionEstudiante } from "@/models";
import { api } from "./axios";

export const DOMINIO_ESCOLARIDAD = "escolaridad";

export const procesarEscolaridad = async (formData: FormData) => {
  const res = await api.post<InformacionEstudiante>(
    "/escolaridad/procesar",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return res.data;
};
