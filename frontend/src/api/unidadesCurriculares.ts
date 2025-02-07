import type { UnidadCurricular } from "@/models";
import { api } from "./axios";

export const getUnidadesCurriculares = async () => {
  const res = await api.get<UnidadCurricular[]>("/unidades-curriculares/");

  return res.data;
};
