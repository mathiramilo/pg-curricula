import requisitosTitulo from '../../data/requisitos-titulo.json';
import nombreUCsObligatorias from '../../data/ucs-obligatorias.json';
import ucsFing from '../../data/ucs-fing.json';
import ucsGrupos from '../../data/ucs-grupos.json';
import previaturas from '../../data/previaturas.json';
import {
  GrupoHijo,
  InformacionEstudiante,
  ReglaPreviaturas,
  TIPO_APROBACION,
  UnidadCurricular,
} from '../types';
import { cumplePrevias } from './previas.service';

export const obtenerListadoUCs = (
  informacionEstudiante: InformacionEstudiante
): UnidadCurricular[] => {
  const listadoUCs: UnidadCurricular[] = [];

  // 1. Eliminar de materias obligatorias las ya aprobadas
  const nombreUCsObligatoriasFiltradas = nombreUCsObligatorias.filter(
    (unidadCurricular) =>
      !informacionEstudiante.unidadesCurricularesAprobadas.hasOwnProperty(
        unidadCurricular
      )
  );

  const UCsObligatoriasFiltradas = nombreUCsObligatoriasFiltradas.map(
    (nombreUC) => {
      return ucsFing.find((uc) => uc.nombreUC === nombreUC) as UnidadCurricular;
    }
  );

  // 2. Agregar las materias obligatorias al listado y actualizar informacionEstudiante
  UCsObligatoriasFiltradas.forEach((unidadCurricular) => {
    listadoUCs.push(unidadCurricular);
    actualizarInformacionEstudiante(
      informacionEstudiante,
      unidadCurricular,
      unidadCurricular.nombreGrupoHijo
    );
  });

  // Por cada grupo
  for (const grupo in ucsGrupos) {
    // Si cumple los requisitos pasar al siguiente
    if (informacionEstudiante[grupo] >= requisitosTitulo[grupo]) continue;

    // 1. Eliminar de materias grupo las ya aprobadas
    const nombreUCsGrupoFiltradas = ucsGrupos[grupo].filter(
      (unidadCurricular) =>
        !informacionEstudiante.unidadesCurricularesAprobadas.hasOwnProperty(
          unidadCurricular
        )
    );

    // 2. Seleccionar una materia al azar, agregarla al listado y actualizar informacionEstudiante
    while (informacionEstudiante[grupo] < requisitosTitulo[grupo]) {
      const indiceAleatorio = Math.floor(
        Math.random() * nombreUCsGrupoFiltradas.length
      );
      const nombreUCAleatoria = nombreUCsGrupoFiltradas[indiceAleatorio];
      const ucAleatoria = ucsFing.find(
        (uc) => uc.nombreUC === nombreUCAleatoria
      ) as UnidadCurricular;
      const previaturasUCAleatoria = previaturas[
        ucAleatoria.nombreUC
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
    const grupos = Object.keys(ucsGrupos);
    const grupoAleatorio = grupos[
      Math.floor(Math.random() * grupos.length)
    ] as GrupoHijo;

    // 2. Seleccionar una unidad curricular del grupo al azar
    const indiceAleatorio = Math.floor(
      Math.random() * ucsGrupos[grupoAleatorio!].length
    );
    const nombreUCAleatoria = ucsGrupos[grupoAleatorio!][indiceAleatorio];
    const ucAleatoria = ucsFing.find(
      (uc) => uc.nombreUC === nombreUCAleatoria
    ) as UnidadCurricular;
    const previaturasUCAleatoria = previaturas[
      ucAleatoria.nombreUC
    ] as ReglaPreviaturas;

    if (!cumplePrevias(informacionEstudiante, previaturasUCAleatoria)) continue;

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

const actualizarInformacionEstudiante = (
  informacionEstudiante: InformacionEstudiante,
  unidadCurricular: UnidadCurricular,
  grupo: GrupoHijo
): void => {
  informacionEstudiante.unidadesCurricularesAprobadas.unidadCurricular = {
    nombre: unidadCurricular.nombreUC,
    creditos: unidadCurricular.creditosUC,
    calificacion: '',
    grupo: grupo,
    area: unidadCurricular.nombreGrupoPadre,
    fecha: new Date().toISOString(),
    tipoAprobacion: TIPO_APROBACION.EXAMEN,
  };
  informacionEstudiante[grupo] += unidadCurricular.creditosUC;
  informacionEstudiante.creditosTotales += unidadCurricular.creditosUC;
};
