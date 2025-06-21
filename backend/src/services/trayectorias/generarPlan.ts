import { InformacionEstudiante, SemestreDeDictado } from "@/types";
import { generarGrafo } from "./generarGrafo";
import { obtenerListadoUCs } from "./obtenerListadoUCs";

export const generarPlan = (
  informacionEstudiante: InformacionEstudiante,
  creditosPorSemestre: number,
  semestreInicial: SemestreDeDictado,
) => {
  const listadoUCs = obtenerListadoUCs(structuredClone(informacionEstudiante));

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

  return plan;
};
