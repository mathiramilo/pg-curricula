import { InformacionEstudiante, SEMESTRE_DE_DICTADO } from '../../types';
import { obtenerListadoUCs } from './obtenerListadoUCs';
import { generarGrafo } from './generarGrafo';

export const generarPlan = (
  informacionEstudiante: InformacionEstudiante,
  creditosPorSemestre: number
) => {
  const semestreInicial = SEMESTRE_DE_DICTADO.PRIMER_SEMESTRE;

  const listadoUCs = obtenerListadoUCs(informacionEstudiante);

  const grafo = generarGrafo(
    listadoUCs,
    semestreInicial,
    informacionEstudiante
  );

  const plan = grafo.scheduleFinal(semestreInicial, creditosPorSemestre);

  return plan;
};
