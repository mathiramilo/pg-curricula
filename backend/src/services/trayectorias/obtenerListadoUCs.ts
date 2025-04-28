import requisitosTitulo from '../../../data/requisitos-titulo.json';
import ucsObligatorias from '../../../data/ucs-obligatorias.json';
import unidadesCurricularesJson from '../../../data/unidades-curriculares.json';
import ucsOptativasGruposActuales from '../../../data/ucs-optativas-grupos-actuales.json';
import previaturas from '../../../data/previaturas.json';

import {
  GrupoHijo,
  InformacionEstudiante,
  ReglaPreviaturas,
  UnidadCurricular,
} from '../../types';
import { cumplePrevias } from '../previas.service';
import { actualizarInformacionEstudiante } from '../../utils';

const UCS_EXCEPCIONALES = [{ nombre: 'PROYECTO DE GRADO', codigo: '1730' }];

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
      return unidadesCurricularesJson.find(
        (uc) => uc.codigo === unidadCurricular.codigo
      ) as UnidadCurricular;
    })
    .filter((uc) => uc);

  // 2. Agregar las materias obligatorias al listado y actualizar informacionEstudiante
  // Para que esto funcione el listado de materias obligatorias debe estar ordenado, empezando por las que tienen menos previas, para que la funcion "cumplePrevias" retorne true.
  ucsObligatoriasFaltantes.forEach((unidadCurricular) => {
    if (
      cumplePrevias(
        informacionEstudiante,
        previaturas[unidadCurricular.codigo]
      ) ||
      UCS_EXCEPCIONALES.find((uc) => uc.codigo === unidadCurricular.codigo)
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
  for (const grupo in ucsOptativasGruposActuales) {
    // Si cumple los requisitos pasar al siguiente
    if (informacionEstudiante[grupo] >= requisitosTitulo[grupo]) continue;

    // 1. Eliminar de materias grupo las ya aprobadas
    const codigoUCsGrupoFiltradas = ucsOptativasGruposActuales[grupo].filter(
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
      const ucAleatoria = unidadesCurricularesJson.find(
        (uc) => uc.codigo === codigoUCAleatorio
      ) as UnidadCurricular;
      const previaturasUCAleatoria = previaturas[
        ucAleatoria.codigo
      ] as ReglaPreviaturas;

      if (
        !cumplePrevias(informacionEstudiante, previaturasUCAleatoria) ||
        listadoUCs.find((uc) => uc.codigo === ucAleatoria.codigo)
      )
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
    const grupos = Object.keys(ucsOptativasGruposActuales);
    const grupoAleatorio = grupos[
      Math.floor(Math.random() * grupos.length)
    ] as GrupoHijo;

    // 2. Seleccionar una unidad curricular del grupo al azar
    const indiceAleatorio = Math.floor(
      Math.random() * ucsOptativasGruposActuales[grupoAleatorio!].length
    );
    const codigoUCAleatorio =
      ucsOptativasGruposActuales[grupoAleatorio!][indiceAleatorio];
    const ucAleatoria = unidadesCurricularesJson.find(
      (uc) => uc.codigo === codigoUCAleatorio
    ) as UnidadCurricular;
    const previaturasUCAleatoria = previaturas[
      ucAleatoria.codigo
    ] as ReglaPreviaturas;

    if (
      !cumplePrevias(informacionEstudiante, previaturasUCAleatoria) ||
      listadoUCs.find((uc) => uc.codigo === ucAleatoria.codigo)
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
