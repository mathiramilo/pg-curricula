import type { TrayectoriaSugeridaSemestre, UnidadCurricular } from "@/models";
import { api } from "./axios";

export const DOMINIO_UNIDADES_CURRICULARES = "unidades-curriculares";

export const getUnidadesCurriculares = async () => {
  const res = await api.get<UnidadCurricular[]>("/unidades-curriculares");

  return res.data;
};

export const getTrayectoriaSugerida = async () => {
  const res = await api.get<TrayectoriaSugeridaSemestre[]>(
    "/unidades-curriculares/trayectoria-sugerida",
  );

  return res.data;
};
