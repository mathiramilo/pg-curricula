import { InformacionEstudiante, SEMESTRE_DE_DICTADO } from '../types';
import { generarGrafo, obtenerListadoUCs } from '../services';
import { ie9, ie315, ie389 } from '../tests/mocks';

const SEMESTRE_INICIAL = SEMESTRE_DE_DICTADO.PRIMER_SEMESTRE;

const informacionEstudiante = structuredClone(ie9);

const listadoUCs = obtenerListadoUCs(ie9 as InformacionEstudiante);

const grafo = generarGrafo(
  listadoUCs,
  SEMESTRE_INICIAL,
  informacionEstudiante as InformacionEstudiante
);

grafo.draw();

const { minimalDuration, ES, LS, slack, criticalPath } = grafo.criticalPath();

console.log('Total Semesters:', minimalDuration);
console.log('Earliest Start:', ES);
console.log('Latest Start:', LS);
console.log('Slack:', slack);
console.log('Critical Nodes:', criticalPath);
