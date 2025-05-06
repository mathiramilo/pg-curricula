import { InformacionEstudiante, SEMESTRE_DE_DICTADO } from '../types';
import { generarGrafo, obtenerListadoUCs } from '../services';
import { ie9, ie72, ie315, ie389, ie115 } from '../tests/mocks';

const SEMESTRE_INICIAL = SEMESTRE_DE_DICTADO.PRIMER_SEMESTRE;

const informacionEstudiante = structuredClone(ie72);

const listadoUCs = obtenerListadoUCs(ie72 as InformacionEstudiante);

const grafo = generarGrafo(
  listadoUCs,
  SEMESTRE_INICIAL,
  informacionEstudiante as InformacionEstudiante
);

const plan = grafo.scheduleFinal(SEMESTRE_INICIAL, 30);

console.log('Plan de cursado:', JSON.stringify(plan, null, 4));
