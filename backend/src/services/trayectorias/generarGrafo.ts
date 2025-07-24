import previaturas from "@/data/previaturas.json";
import ucsAnuales from "@/data/ucs-anuales.json";
import { Graph } from "@/models";
import {
  cumplePreviaturas,
  obtenerCodigosUCsPrevias,
} from "@/services/previaturas.service";
import {
  InformacionEstudiante,
  ReglaPreviaturas,
  SemestreDeDictado,
  UnidadCurricular,
} from "@/types";
import { actualizarInformacionEstudiante, calcularValorArista } from "@/utils";

const previaturasTyped = previaturas as Record<string, ReglaPreviaturas>;

const NOMBRE_NODO_INICIO = "inicio";
const NOMBRE_NODO_FIN = "fin";

export const generarGrafo = (
  listadoUCs: UnidadCurricular[],
  semestreInicial: SemestreDeDictado,
  informacionEstudiante: InformacionEstudiante,
): Graph => {
  const grafo = new Graph();

  grafo.addNode({ id: NOMBRE_NODO_INICIO, isInitial: true, isFinal: false });
  grafo.addNode({ id: NOMBRE_NODO_FIN, isInitial: false, isFinal: true });

  let listadoUCsFaltantes: UnidadCurricular[] = [];
  const listadoUCsPrevias: UnidadCurricular[] = [];

  for (const uc of listadoUCs) {
    if (cumplePreviaturas(informacionEstudiante, previaturasTyped[uc.codigo])) {
      const seDictaEnSemestreActual = uc.semestres?.includes(semestreInicial);
      const valorArista = seDictaEnSemestreActual ? 0 : 1;

      grafo.addNode({ id: uc.codigo, unidadCurricular: uc });
      grafo.addEdge(NOMBRE_NODO_INICIO, uc.codigo, valorArista);
      grafo.addEdge(
        uc.codigo,
        NOMBRE_NODO_FIN,
        ucsAnuales.includes(uc.codigo) ? 2 : 1,
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
      uc.nombreGrupoHijo,
    );
  });

  const listadoUCsSinPrevias: UnidadCurricular[] = [];

  while (listadoUCsFaltantes.length > 0) {
    for (const uc of listadoUCsFaltantes) {
      if (
        cumplePreviaturas(informacionEstudiante, previaturasTyped[uc.codigo])
      ) {
        let codigosUCsPrevias: string[] = [];

        obtenerCodigosUCsPrevias(
          previaturasTyped[uc.codigo],
          codigosUCsPrevias,
        );
        codigosUCsPrevias = codigosUCsPrevias.filter((codigoUC) =>
          listadoUCsPrevias.find((ucPrevia) => ucPrevia.codigo === codigoUC),
        );

        //* Si tiene previas en el grafo, se conecta con ellas. Caso contrario, se agrega al pool de UCs sin previas
        if (codigosUCsPrevias.length > 0) {
          grafo.addNode({ id: uc.codigo, unidadCurricular: uc });

          codigosUCsPrevias.forEach((codigoUC) => {
            const ucPrevia = listadoUCsPrevias.find(
              (ucPrevia) => ucPrevia.codigo === codigoUC,
            );
            if (!ucPrevia) return;

            const valorArista = calcularValorArista(
              ucPrevia.semestres ?? [],
              uc.semestres ?? [],
            );

            grafo.addEdge(codigoUC, uc.codigo, valorArista);
          });

          grafo.addEdge(
            uc.codigo,
            NOMBRE_NODO_FIN,
            ucsAnuales.includes(uc.codigo) ? 2 : 1,
          );

          listadoUCsPrevias.push(uc);
        } else {
          grafo.addUnidadCurricularSinPrevias(uc);
          listadoUCsSinPrevias.push(uc);
        }
      }
    }

    listadoUCsFaltantes = listadoUCsFaltantes.filter(
      (uc) =>
        !listadoUCsPrevias.includes(uc) &&
        !listadoUCsSinPrevias.includes(uc) &&
        !grafo.getUnidadesCurricularesSinPrevias().includes(uc),
    );

    listadoUCsPrevias.forEach((uc) => {
      actualizarInformacionEstudiante(
        informacionEstudiante,
        uc,
        uc.nombreGrupoHijo,
      );
    });

    listadoUCsSinPrevias.forEach((uc) => {
      actualizarInformacionEstudiante(
        informacionEstudiante,
        uc,
        uc.nombreGrupoHijo,
      );
    });
  }

  return grafo;
};
