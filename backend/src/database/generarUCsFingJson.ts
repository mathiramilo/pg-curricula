import fs from 'fs';

import { UnidadCurricular, UnidadCurricularConGrupoCSV, UnidadCurricularFingCSV } from '../types';
import { leerCSV } from '../lib/leerCSV'

const UBICACION_CSV_UCS_CON_GRUPO = '../../data/ucs-con-grupo.csv';
const UBICACION_CSV_UCS_FING = '../../data/ucs-fing.csv';
const UBICACION_DESTINO = '../../data/ucs-fing.json';

const generarUCsFing = async (): Promise<void> => {
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
	const ucsFing = await leerCSV(UBICACION_CSV_UCS_FING) as UnidadCurricularFingCSV[];
	
  const unidadesCurriculares: UnidadCurricular[] = [];

	for (let i = 0; i < ucsConGrupo.length; i++) {
		const ucFing = ucsFing[i];
		const ucConGrupo = ucsConGrupo[i];

		const uc: UnidadCurricular = {
			nombreUC: ucConGrupo!.nombre_mat,
			codigoEnServicioUC: ucConGrupo!.codenservicio_mat,
			codigoUC: +ucConGrupo!.codigo_materia,
			tipoUC: ucFing!.tipo_mat,
			creditosUC: +ucFing!.creditos_mat,
			nombreGrupoPadre: ucConGrupo!.nombrep,
			codigoGrupoPadre: +ucConGrupo!.codigogrupop,
			nombreGrupoHijo: ucConGrupo!.nombreh,
			codigoGrupoHijo: +ucConGrupo!.codigogrupoh,
		};

		unidadesCurriculares.push(uc);
	}

	return unidadesCurriculares;
};

generarUCsFing();