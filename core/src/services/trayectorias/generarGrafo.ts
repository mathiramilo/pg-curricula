import previaturas from '../../../data/previaturas.json';

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

  grafo.addNode(NOMBRE_NODO_INICIO, true, false);
  grafo.addNode(NOMBRE_NODO_FIN, false, true);

  const listadoUCsFaltantes: UnidadCurricular[] = [];
  let listadoUCsPrevias: UnidadCurricular[] = [];
  let semestreActual = semestreInicial;

  for (const uc of listadoUCs) {
    if (
      cumplePrevias(informacionEstudiante, previaturas[uc.codigoEnServicioUC])
    ) {
      console.log(uc.nombreUC);

      const seDictaEnSemestreActual = uc.semestres?.includes(semestreActual)!; // Ya nos aseguramos de que semestres no sea null en el paso anterior

      const valorArista = seDictaEnSemestreActual ? 0 : 1;

      grafo.addNode(uc.codigoEnServicioUC);
      grafo.addEdge(NOMBRE_NODO_INICIO, uc.codigoEnServicioUC, valorArista);
      grafo.addEdge(uc.codigoEnServicioUC, NOMBRE_NODO_FIN, 1); // TODO: Revisar como obtener la duracion de una unidad curricular (podriamos poner a todas 1 y proyecto de grado 2)

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

  semestreActual = obtenerSiguienteSemestre(semestreActual);

  let listadoUCsPreviasAux = [...listadoUCsPrevias];

  while (listadoUCsFaltantes.length > 0) {
    listadoUCsPrevias = [];

    for (const uc of listadoUCsFaltantes) {
      if (
        cumplePrevias(informacionEstudiante, previaturas[uc.codigoEnServicioUC])
      ) {
        let codigosUCsPrevias = [];

        obtenerCodigosUCsPrevias(
          previaturas[uc.codigoEnServicioUC],
          codigosUCsPrevias
        );
        codigosUCsPrevias = codigosUCsPrevias.filter((codigoUC) =>
          listadoUCsPreviasAux.find(
            (ucPrevia) => ucPrevia.codigoEnServicioUC === codigoUC
          )
        );

        grafo.addNode(uc.codigoEnServicioUC);
        codigosUCsPrevias.forEach((codigoUC) => {
          const ucPrevia = listadoUCsPreviasAux.find(
            (ucPrevia) => ucPrevia.codigoEnServicioUC === codigoUC
          );
          const valorArista = calcularValorArista(
            ucPrevia?.semestres!,
            uc.semestres! // Ya nos aseguramos de que semestres no sea null en el paso anterior
          );

          grafo.addEdge(codigoUC, uc.codigoEnServicioUC, valorArista);
        });
        grafo.addEdge(uc.codigoEnServicioUC, NOMBRE_NODO_FIN, 1); // TODO: Revisar como obtener la duracion de una unidad curricular (podriamos poner a todas 1 y proyecto de grado 2)

        listadoUCsPrevias.push(uc);

        listadoUCsFaltantes.splice(listadoUCsFaltantes.indexOf(uc), 1);
      }
    }

    listadoUCsPrevias.forEach((uc) => {
      actualizarInformacionEstudiante(
        informacionEstudiante,
        uc,
        uc.nombreGrupoHijo
      );
    });

    listadoUCsPreviasAux = [...listadoUCsPrevias];
  }

  return grafo;
};
