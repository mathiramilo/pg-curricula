import fs from 'fs';

import { GrupoHijo, GrupoPadre, SEMESTRE_DE_DICTADO, SemestreDeDictado, TipoUC, UnidadCurricular, UnidadCurricularConGrupoCSV, UnidadCurricularFingCSV, UnidadCurricularRelevamientoDeDatosCSV } from '../types';
import { leerCSV, eliminarTildes } from '../lib'

const UBICACION_CSV_UCS_CON_GRUPO = '../../data/csv/ucs-con-grupo.csv';
const UBICACION_CSV_UCS_FING = '../../data/csv/ucs-fing.csv';
const UBICACION_CSV_UCS_ACTUALES_PRIMER_SEMESTRE = '../../data/csv/ucs-actuales-primer-semestre.csv';
const UBICACION_CSV_UCS_ACTUALES_SEGUNDO_SEMESTRE = '../../data/csv/ucs-actuales-segundo-semestre.csv';
const UBICACION_DESTINO = '../../data/ucs-fing.json';

const generarUCsFingJson = async (): Promise<void> => {
	try {
		const ucsFing = await obtenerUCsFing();

		fs.writeFileSync(
			UBICACION_DESTINO,
			JSON.stringify(ucsFing, null, 2),
			'utf8'
		);
	} catch (error) {
		console.error(error);
	}
};

const obtenerUCsFing = async (): Promise<UnidadCurricular[]> => {
	const ucsConGrupo = await leerCSV(UBICACION_CSV_UCS_CON_GRUPO) as UnidadCurricularConGrupoCSV[];
	const ucsActualesPrimerSemestre = await leerCSV(UBICACION_CSV_UCS_ACTUALES_PRIMER_SEMESTRE) as UnidadCurricularRelevamientoDeDatosCSV[];
	const ucsActualesSegundoSemestre = await leerCSV(UBICACION_CSV_UCS_ACTUALES_SEGUNDO_SEMESTRE) as UnidadCurricularRelevamientoDeDatosCSV[];
	const ucsFing = await leerCSV(UBICACION_CSV_UCS_FING) as UnidadCurricularFingCSV[];
	
  const unidadesCurriculares: UnidadCurricular[] = [];

	for (let i = 0; i < ucsConGrupo.length; i++) {
		const ucFing = ucsFing[i]!;
		const ucConGrupo = ucsConGrupo[i]!;

		let semestres: SemestreDeDictado[] = [];
		if (ucsActualesPrimerSemestre.find(uc => eliminarTildes(uc.nombre.toLowerCase()) === eliminarTildes(ucConGrupo.nombre_mat.toLowerCase()))) {
			semestres.push(SEMESTRE_DE_DICTADO.PRIMER_SEMESTRE);
		}
		if (ucsActualesSegundoSemestre.find(uc => eliminarTildes(uc.nombre.toLowerCase()) === eliminarTildes(ucConGrupo.nombre_mat.toLowerCase()))) {
			semestres.push(SEMESTRE_DE_DICTADO.SEGUNDO_SEMESTRE);
		}

		const uc: UnidadCurricular = {
			nombreUC: ucConGrupo.nombre_mat,
			codigoEnServicioUC: ucConGrupo.codenservicio_mat,
			codigoUC: +ucConGrupo.codigo_materia,
			tipoUC: ucFing.tipo_mat as TipoUC,
			creditosUC: +ucFing.creditos_mat,
			nombreGrupoPadre: ucConGrupo.nombrep as GrupoPadre,
			codigoGrupoPadre: +ucConGrupo.codigogrupop,
			nombreGrupoHijo: ucConGrupo.nombreh as GrupoHijo,
			codigoGrupoHijo: +ucConGrupo.codigogrupoh,
			semestres: semestres.length > 0 ? semestres : null,
		};

		unidadesCurriculares.push(uc);
	}

	return unidadesCurriculares;
};

generarUCsFingJson();
