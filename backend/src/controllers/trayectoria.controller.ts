import { InformacionEstudiante, SEMESTRE_DE_DICTADO } from '../types';
import { generarGrafo, obtenerListadoUCs } from '../services';
import { ie267 } from '../tests/mocks';

const SEMESTRE_INICIAL = SEMESTRE_DE_DICTADO.PRIMER_SEMESTRE;

const informacionEstudiante = structuredClone(ie267);

const listadoUCs = obtenerListadoUCs(ie267 as InformacionEstudiante);

const grafo = generarGrafo(
  listadoUCs,
  SEMESTRE_INICIAL,
  informacionEstudiante as InformacionEstudiante
);

grafo.drawGraph();
