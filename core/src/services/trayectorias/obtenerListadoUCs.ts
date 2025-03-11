import requisitosTitulo from '../../../data/requisitos-titulo.json';
import ucsObligatorias from '../../../data/ucs-obligatorias.json';
import ucsFing from '../../../data/ucs-fing.json';
import ucsGruposActuales from '../../../data/ucs-grupos-actuales.json';
import previaturas from '../../../data/previaturas.json';

import {
  GrupoHijo,
  InformacionEstudiante,
  ReglaPreviaturas,
  UnidadCurricular,
} from '../../types';
import { cumplePrevias } from '../previas.service';
import { actualizarInformacionEstudiante } from '../../utils';

export const obtenerListadoUCs = (
  informacionEstudiante: InformacionEstudiante
): UnidadCurricular[] => {
  const listadoUCs: UnidadCurricular[] = [];

  // 1. Eliminar de materias obligatorias las ya aprobadas
  const ucsObligatoriasFiltradas = ucsObligatorias.filter(
    (unidadCurricular) =>
      !informacionEstudiante.unidadesCurricularesAprobadas.hasOwnProperty(
        unidadCurricular.codigo
      )
  );

  const ucsObligatoriasFaltantes = ucsObligatoriasFiltradas
    .map((unidadCurricular) => {
      return ucsFing.find(
        (uc) => uc.codigoEnServicioUC === unidadCurricular.codigo
      ) as UnidadCurricular;
    })
    .filter((uc) => uc);

  // 2. Agregar las materias obligatorias al listado y actualizar informacionEstudiante
  // Para que esto funcione el listado de materias obligatorias debe estar ordenado, empezando por las que tienen menos previas
  ucsObligatoriasFaltantes.forEach((unidadCurricular) => {
    if (
      cumplePrevias(
        informacionEstudiante,
        previaturas[unidadCurricular.codigoEnServicioUC]
      )
    ) {
      listadoUCs.push(unidadCurricular);

      actualizarInformacionEstudiante(
        informacionEstudiante,
        unidadCurricular,
        unidadCurricular.nombreGrupoHijo
      );
    }
  });

  // Por cada grupo
  for (const grupo in ucsGruposActuales) {
    // Si cumple los requisitos pasar al siguiente
    if (informacionEstudiante[grupo] >= requisitosTitulo[grupo]) continue;

    // 1. Eliminar de materias grupo las ya aprobadas
    const codigoUCsGrupoFiltradas = ucsGruposActuales[grupo].filter(
      (codigoUC) =>
        !informacionEstudiante.unidadesCurricularesAprobadas.hasOwnProperty(
          codigoUC
        )
    );

    // 2. Seleccionar una materia al azar, agregarla al listado y actualizar informacionEstudiante
    while (informacionEstudiante[grupo] < requisitosTitulo[grupo]) {
      const indiceAleatorio = Math.floor(
        Math.random() * codigoUCsGrupoFiltradas.length
      );
      const codigoUCAleatorio = codigoUCsGrupoFiltradas[indiceAleatorio];
      const ucAleatoria = ucsFing.find(
        (uc) => uc.codigoEnServicioUC === codigoUCAleatorio
      ) as UnidadCurricular;
      const previaturasUCAleatoria = previaturas[
        ucAleatoria.codigoEnServicioUC
      ] as ReglaPreviaturas;

      if (!cumplePrevias(informacionEstudiante, previaturasUCAleatoria))
        continue;

      listadoUCs.push(ucAleatoria);
      actualizarInformacionEstudiante(
        informacionEstudiante,
        ucAleatoria,
        grupo as GrupoHijo
      );
    }
  }

  // Hasta completar 450 creditos
  while (informacionEstudiante.creditosTotales < 450) {
    // 1. Seleccionar un grupo al azar
    const grupos = Object.keys(ucsGruposActuales);
    const grupoAleatorio = grupos[
      Math.floor(Math.random() * grupos.length)
    ] as GrupoHijo;

    // 2. Seleccionar una unidad curricular del grupo al azar
    const indiceAleatorio = Math.floor(
      Math.random() * ucsGruposActuales[grupoAleatorio!].length
    );
    const codigoUCAleatorio =
      ucsGruposActuales[grupoAleatorio!][indiceAleatorio];
    const ucAleatoria = ucsFing.find(
      (uc) => uc.codigoEnServicioUC === codigoUCAleatorio
    ) as UnidadCurricular;
    const previaturasUCAleatoria = previaturas[
      ucAleatoria.codigoEnServicioUC
    ] as ReglaPreviaturas;

    if (
      !cumplePrevias(informacionEstudiante, previaturasUCAleatoria) ||
      informacionEstudiante.unidadesCurricularesAprobadas[
        ucAleatoria.codigoEnServicioUC
      ]
    )
      continue;

    // 3. Agregar la unidad curricular al listado y actualizar informacionEstudiante
    listadoUCs.push(ucAleatoria);
    actualizarInformacionEstudiante(
      informacionEstudiante,
      ucAleatoria,
      grupoAleatorio!
    );
  }

  return listadoUCs;
};
