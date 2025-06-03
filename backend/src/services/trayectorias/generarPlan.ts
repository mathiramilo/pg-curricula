import {
  InformacionEstudiante,
  SEMESTRE_DE_DICTADO,
  SemestreDeDictado,
} from '../../types';
import { obtenerListadoUCs } from './obtenerListadoUCs';
import { generarGrafo } from './generarGrafo';

export const generarPlan = (
  informacionEstudiante: InformacionEstudiante,
  creditosPorSemestre: number,
  semestreInicial: SemestreDeDictado
) => {
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
