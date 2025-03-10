import Graph from './grafo.class';

import {
  actualizarInformacionEstudiante,
  cumplePrevias,
  obtenerListadoUCs,
} from '../services';
import { ie267 } from '../tests/mocks';
import previaturas from '../../data/previaturas.json';
import {
  InformacionEstudiante,
  SemestreDeDictado,
  UnidadCurricular,
} from '../types';

export const generarGrafo = (
  listadoUCs: UnidadCurricular[],
  semestreInicial: SemestreDeDictado,
  informacionEstudiante: InformacionEstudiante
) => {
  const grafo = new Graph();

  grafo.addNode('inicio', true, false);
  grafo.addNode('fin', false, true);

  const listadoUCsFaltantes: UnidadCurricular[] = [];
  let semestreActual = semestreInicial;

  for (const uc of listadoUCs) {
    if (
      cumplePrevias(informacionEstudiante, previaturas[uc.codigoEnServicioUC])
    ) {
      const seDictaEnSemestreActual = uc.semestres?.includes(semestreActual)!; // Ya nos aseguramos de que semestres no sea null en el paso anterior

      const valorArista = seDictaEnSemestreActual ? 0 : 1;

      grafo.addNode(uc.codigoEnServicioUC, false, false);
      grafo.addEdge('inicio', uc.codigoEnServicioUC, valorArista);
      grafo.addEdge(uc.codigoEnServicioUC, 'fin', 1); // TODO: Revisar como obtener la duracion de una unidad curricular (podriamos poner a todas 1 y proyecto de grado 2)

      actualizarInformacionEstudiante(
        informacionEstudiante,
        uc,
        uc.nombreGrupoHijo
      );
    } else {
      listadoUCsFaltantes.push(uc);
    }
  }

  semestreActual = obtenerSiguienteSemestre(semestreActual);

  while (listadoUCsFaltantes.length > 0) {
    for (const uc of listadoUCsFaltantes) {
      if (
        cumplePrevias(informacionEstudiante, previaturas[uc.codigoEnServicioUC])
      ) {
        const seDictaEnSemestreActual = uc.semestres?.includes(semestreActual)!; // Ya nos aseguramos de que semestres no sea null en el paso anterior

        // TODO: Debemos obtener los nodos que son previa de la uc actual y comparar los semestres de dicatdo para obtener el valor de las aristas
        const valorArista = seDictaEnSemestreActual ? 1 : 2;

        grafo.addNode(uc.codigoEnServicioUC, false, false);
        grafo.addEdge(uc.codigoEnServicioUC, 'fin', 1); // TODO: Revisar como obtener la duracion de una unidad curricular (podriamos poner a todas 1 y proyecto de grado 2)

        actualizarInformacionEstudiante(
          informacionEstudiante,
          uc,
          uc.nombreGrupoHijo
        );

        listadoUCsFaltantes.splice(listadoUCsFaltantes.indexOf(uc), 1); // TODO: Buscar forma mas eficiente de hacerlo (ver de utilizar foreach para ya tener el index)
      }
    }
  }
};

export const obtenerSiguienteSemestre = (semestreActual: SemestreDeDictado) => {
  return semestreActual === '1' ? '2' : '1';
};

const listadoUCs = obtenerListadoUCs(ie267 as InformacionEstudiante);
generarGrafo(listadoUCs, '1', ie267 as InformacionEstudiante);
