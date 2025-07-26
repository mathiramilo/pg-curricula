import {
  InformacionEstudiante,
  SemestreDeDictado,
  UnidadCurricular,
} from "@/types";
import { generarGrafo } from "./generarGrafo";
import { verificarRequisitosParaTitulo } from "./verificarRequisitos";

export const generarPlan = (
  informacionEstudiante: InformacionEstudiante,
  listadoUCs: UnidadCurricular[],
  creditosPorSemestre: number,
  semestreInicial: SemestreDeDictado,
) => {
  const result = verificarRequisitosParaTitulo(
    informacionEstudiante,
    listadoUCs,
  );

  if (!result.success) {
    return {
      success: false,
      errors: result.errors,
    };
  }

  const grafo = generarGrafo(
    listadoUCs,
    semestreInicial,
    structuredClone(informacionEstudiante),
  );

  const plan = grafo.scheduleFinal(
    semestreInicial,
    creditosPorSemestre,
    structuredClone(informacionEstudiante),
  );

  return {
    success: true,
    plan,
  };
};
