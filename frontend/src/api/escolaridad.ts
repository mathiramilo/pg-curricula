import type { InformacionEstudiante } from "@/types";
import { api } from "./axios";

export interface ApiResponse<T> {
  exito: boolean;
  datos: T;
  codigo: number;
}

export const procesarEscolaridad = async (formData: FormData) => {
  const res = await api.post<ApiResponse<InformacionEstudiante>>(
    "/escolaridad/procesar-escolaridad",
    formData,
  );
  return res.data.datos;
};
