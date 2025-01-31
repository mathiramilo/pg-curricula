import requisitosTitulo from '../../data/requisitos-titulo.json';
import UCsGrupos from '../../data/ucs-grupos.json';
import nombreUCsObligatorias from '../../data/ucs-obligatorias.json';
import ucsFing from '../../data/ucs-fing.json';
import previaturas from '../../data/previaturas.json';
import { GrupoHijo, InformacionEstudiante, ReglaPreviaturas, TIPO_APROBACION, UnidadCurricular } from '../types';
import { cumplePrevias } from './cumplePrevias'

export const obtenerListadoUCs = (
  informacionEstudiante: InformacionEstudiante
): UnidadCurricular[] => {
  const listadoUCs: UnidadCurricular[] = [];

  // 1. Eliminar de materias obligatorias las ya aprobadas
  const nombreUCsObligatoriasFiltradas = nombreUCsObligatorias.filter(
    unidadCurricular =>
      !informacionEstudiante['UCs Aprobadas'].hasOwnProperty(unidadCurricular)
  );

	const UCsObligatoriasFiltradas = nombreUCsObligatoriasFiltradas.map(nombreUC => {
		return ucsFing.find(uc => uc.nombreUC === nombreUC) as UnidadCurricular;
	})

  // 2. Agregar las materias obligatorias al listado y actualizar informacionEstudiante
  UCsObligatoriasFiltradas.forEach(unidadCurricular => {
    listadoUCs.push(unidadCurricular);
    actualizarInformacionEstudiante(
      informacionEstudiante,
      unidadCurricular,
      unidadCurricular.nombreGrupoHijo
    );
  });

  // Por cada grupo
  for (const grupo in UCsGrupos) {
    // Si cumple los requisitos pasar al siguiente
    if (informacionEstudiante[grupo] >= requisitosTitulo[grupo]) continue;

    // 1. Eliminar de materias grupo las ya aprobadas
    const nombreUCsGrupoFiltradas = UCsGrupos[grupo].filter(
      unidadCurricular =>
        !informacionEstudiante['UCs Aprobadas'].hasOwnProperty(unidadCurricular)
    );

    // 2. Seleccionar una materia al azar, agregarla al listado y actualizar informacionEstudiante
    while (informacionEstudiante[grupo] < requisitosTitulo[grupo]) {
      const indiceAleatorio = Math.floor(
        Math.random() * nombreUCsGrupoFiltradas.length
      );
      const nombreUCAleatoria = nombreUCsGrupoFiltradas[indiceAleatorio];
			const ucAleatoria = ucsFing.find(
				uc => uc.nombreUC === nombreUCAleatoria
			) as UnidadCurricular;
			const previaturasUCAleatoria = previaturas[ucAleatoria.nombreUC] as ReglaPreviaturas;

      if (!cumplePrevias(informacionEstudiante, previaturasUCAleatoria)) continue;

      listadoUCs.push(ucAleatoria);
      actualizarInformacionEstudiante(
        informacionEstudiante,
        ucAleatoria,
        grupo as GrupoHijo
      );
    }
  }

  // Hasta completar 450 creditos
  while (informacionEstudiante['Creditos Totales'] < 450) {
    // 1. Seleccionar un grupo al azar
    const grupos = Object.keys(UCsGrupos);
    const grupoAleatorio = grupos[Math.floor(Math.random() * grupos.length)] as GrupoHijo;

    // 2. Seleccionar una unidad curricular del grupo al azar
    const indiceAleatorio = Math.floor(
      Math.random() * UCsGrupos[grupoAleatorio!].length
    );
    const nombreUCAleatoria = UCsGrupos[grupoAleatorio!][indiceAleatorio];
		const ucAleatoria = ucsFing.find(
			uc => uc.nombreUC === nombreUCAleatoria
		) as UnidadCurricular;
		const previaturasUCAleatoria = previaturas[ucAleatoria.nombreUC] as ReglaPreviaturas;

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
  informacionEstudiante['UCs Aprobadas'].unidadCurricular = {
		nombre: unidadCurricular.nombreUC,
		creditos: unidadCurricular.creditosUC,
		calificacion: "",
		grupo: grupo,
		area: unidadCurricular.nombreGrupoPadre,
		fecha: new Date().toISOString(),
		tipoAprobacion: TIPO_APROBACION.EXAMEN
	};
  informacionEstudiante[grupo] += unidadCurricular.creditosUC;
  informacionEstudiante['Creditos Totales'] += unidadCurricular.creditosUC;
};
