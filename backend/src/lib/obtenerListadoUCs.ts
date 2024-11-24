import requisitosTitulo from '../../data/requisitos-titulo.json';
import UCsGrupos from '../../data/ucs-grupos.json';
import UCsObligatorias from '../../data/ucs-obligatorias.json';
import { InformacionEstudiante, UnidadCurricular } from '../types';

export const obtenerListadoUCs = (
  informacionEstudiante: InformacionEstudiante
): string[] => {
  const listadoUCs: string[] = [];

  // 1. Eliminar de materias obligatorias las ya aprobadas
  const UCsObligatoriasFiltradas = UCsObligatorias.filter(
    unidadCurricular =>
      !informacionEstudiante['UCs Aprobadas'].hasOwnProperty(unidadCurricular)
  );

  // 2. Agregar las materias obligatorias al listado y actualizar informacionEstudiante
  UCsObligatoriasFiltradas.forEach(unidadCurricular => {
    listadoUCs.push(unidadCurricular);
    actualizarInformacionEstudiante(
      informacionEstudiante,
      unidadCurricular,
      unidadCurricular.grupo
    );
  });

  // Por cada grupo
  for (const grupo in UCsGrupos) {
    // Si cumple los requisitos pasar al siguiente
    if (informacionEstudiante[grupo] >= requisitosTitulo[grupo]) continue;

    // 1. Eliminar de materias grupo las ya aprobadas
    const UCsGrupoFiltradas = UCsGrupos[grupo].filter(
      unidadCurricular =>
        !informacionEstudiante['UCs Aprobadas'].hasOwnProperty(unidadCurricular)
    );

    // 2. Seleccionar una materia al azar, agregarla al listado y actualizar informacionEstudiante
    while (informacionEstudiante[grupo] < requisitosTitulo[grupo]) {
      const indiceAleatorio = Math.floor(
        Math.random() * UCsGrupoFiltradas.length
      );
      const ucAleatoria = UCsGrupoFiltradas[indiceAleatorio];
      listadoUCs.push(ucAleatoria);
      actualizarInformacionEstudiante(
        informacionEstudiante,
        ucAleatoria,
        grupo
      );
    }
  }

  // Hasta completar 450 creditos
  while (informacionEstudiante['Creditos Totales'] < 450) {
    // 1. Seleccionar un grupo al azar
    const grupos = Object.keys(UCsGrupos);
    const grupoAleatorio = grupos[Math.floor(Math.random() * grupos.length)];

    // 2. Seleccionar una unidad curricular del grupo al azar
    const indiceAleatorio = Math.floor(
      Math.random() * UCsGrupos[grupoAleatorio].length
    );
    const ucAleatoria = UCsGrupos[grupoAleatorio][indiceAleatorio];

    // 3. Agregar la unidad curricular al listado y actualizar informacionEstudiante
    listadoUCs.push(ucAleatoria);
    actualizarInformacionEstudiante(
      informacionEstudiante,
      ucAleatoria,
      grupoAleatorio
    );
  }

  return listadoUCs;
};

const actualizarInformacionEstudiante = (
  informacionEstudiante: InformacionEstudiante,
  unidadCurricular: UnidadCurricular,
  grupo: string
): void => {
  informacionEstudiante['UCs Aprobadas'].unidadCurricular = {};
  informacionEstudiante[grupo] += unidadCurricular.creditos;
  informacionEstudiante['Creditos Totales'] += unidadCurricular.creditos;
};
