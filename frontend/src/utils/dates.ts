import { SEMESTRE_DE_DICTADO } from "@/models";

export const obtenerSemestreActual = () => {
  const fecha = new Date();
  const mes = fecha.getMonth() + 1;

  const semestre =
    mes < 6
      ? SEMESTRE_DE_DICTADO.PRIMER_SEMESTRE
      : SEMESTRE_DE_DICTADO.SEGUNDO_SEMESTRE;

  return semestre;
};
