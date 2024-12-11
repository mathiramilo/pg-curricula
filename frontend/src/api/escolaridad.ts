import type { InformacionEstudiante } from "@/types";
import { api } from "./axios";

export const procesarEscolaridad = async (formData: FormData) => {
  const res = await api.post<InformacionEstudiante>(
    "/escolaridad/procesar-escolaridad",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};
