import { InformacionEstudiante, SEMESTRE_DE_DICTADO } from '../../types';
import { obtenerListadoUCs } from './obtenerListadoUCs';
import { generarGrafo } from './generarGrafo';

export const generarPlan = (
  informacionEstudiante: InformacionEstudiante,
  creditosPorSemestre: number
) => {
  // TODO: Se debe calcular el semestre inicial en base a la fecha actual (tal vez permitir a los usuarios elegir el semestre inicial)
  const semestreInicial = SEMESTRE_DE_DICTADO.PRIMER_SEMESTRE;

  const listadoUCs = obtenerListadoUCs(structuredClone(informacionEstudiante));

  const grafo = generarGrafo(
    listadoUCs,
    semestreInicial,
    structuredClone(informacionEstudiante)
  );

  const plan = grafo.scheduleFinal(
    semestreInicial,
    creditosPorSemestre,
    structuredClone(informacionEstudiante)
  );

  return plan;
};
