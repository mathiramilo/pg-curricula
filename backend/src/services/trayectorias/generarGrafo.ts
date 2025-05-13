import previaturas from '../../../data/previaturas.json';
import ucsAnuales from '../../../data/ucs-anuales.json';

import {
  InformacionEstudiante,
  SemestreDeDictado,
  UnidadCurricular,
} from '../../types';
import { Graph } from '../../models';
import { cumplePrevias, obtenerCodigosUCsPrevias } from '../previas.service';
import {
  actualizarInformacionEstudiante,
  calcularValorArista,
  obtenerSiguienteSemestre,
} from '../../utils';

const NOMBRE_NODO_INICIO = 'inicio';
const NOMBRE_NODO_FIN = 'fin';

export const generarGrafo = (
  listadoUCs: UnidadCurricular[],
  semestreInicial: SemestreDeDictado,
  informacionEstudiante: InformacionEstudiante
): Graph => {
  const grafo = new Graph();

  grafo.addNode({ id: NOMBRE_NODO_INICIO, isInitial: true, isFinal: false });
  grafo.addNode({ id: NOMBRE_NODO_FIN, isInitial: false, isFinal: true });

  let listadoUCsFaltantes: UnidadCurricular[] = [];
  let listadoUCsPrevias: UnidadCurricular[] = [];
  let semestreActual = semestreInicial;

  for (const uc of listadoUCs) {
    if (cumplePrevias(informacionEstudiante, previaturas[uc.codigo])) {
      const seDictaEnSemestreActual = uc.semestres?.includes(semestreActual)!; // Ya nos aseguramos de que semestres no sea null en el paso anterior

      const valorArista = seDictaEnSemestreActual ? 0 : 1;

      grafo.addNode({ id: uc.codigo, unidadCurricular: uc });
      grafo.addEdge(NOMBRE_NODO_INICIO, uc.codigo, valorArista);
      grafo.addEdge(
        uc.codigo,
        NOMBRE_NODO_FIN,
        ucsAnuales.includes(uc.codigo) ? 2 : 1
      );

      listadoUCsPrevias.push(uc);
    } else {
      listadoUCsFaltantes.push(uc);
    }
  }

  listadoUCsPrevias.forEach((uc) => {
    actualizarInformacionEstudiante(
      informacionEstudiante,
      uc,
      uc.nombreGrupoHijo
    );
  });

  //? De aca en adelante no se utiliza mas, que debemos hacer? (Creemos que solo es necesario para el valor de las aristas salientes del nodo inicial)
  semestreActual = obtenerSiguienteSemestre(semestreActual);

  while (listadoUCsFaltantes.length > 0) {
    for (const uc of listadoUCsFaltantes) {
      if (cumplePrevias(informacionEstudiante, previaturas[uc.codigo])) {
        let codigosUCsPrevias: string[] = [];

        obtenerCodigosUCsPrevias(previaturas[uc.codigo], codigosUCsPrevias);
        codigosUCsPrevias = codigosUCsPrevias.filter((codigoUC) =>
          listadoUCsPrevias.find((ucPrevia) => ucPrevia.codigo === codigoUC)
        );

        //* Si tiene previas en el grafo, se conecta con ellas. Caso contrario, se agrega al pool de UCs sin previas
        if (codigosUCsPrevias.length > 0) {
          grafo.addNode({ id: uc.codigo, unidadCurricular: uc });

          codigosUCsPrevias.forEach((codigoUC) => {
            const ucPrevia = listadoUCsPrevias.find(
              (ucPrevia) => ucPrevia.codigo === codigoUC
            );
            const valorArista = calcularValorArista(
              ucPrevia?.semestres!,
              uc.semestres!
            );

            grafo.addEdge(codigoUC, uc.codigo, valorArista);
          });

          grafo.addEdge(
            uc.codigo,
            NOMBRE_NODO_FIN,
            ucsAnuales.includes(uc.codigo) ? 2 : 1
          );

          listadoUCsPrevias.push(uc);
        } else {
          grafo.addUnidadCurricularSinPrevias(uc);
        }
      }
    }

    listadoUCsFaltantes = listadoUCsFaltantes.filter(
      (uc) =>
        !listadoUCsPrevias.includes(uc) &&
        !grafo.getUnidadesCurricularesSinPrevias().includes(uc)
    );

    listadoUCsPrevias.forEach((uc) => {
      actualizarInformacionEstudiante(
        informacionEstudiante,
        uc,
        uc.nombreGrupoHijo
      );
    });
  }

  return grafo;
};
