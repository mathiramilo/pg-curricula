import fs from 'fs';

import {
  SEMESTRE_DE_DICTADO,
  SemestreDeDictado,
  UnidadCurricular,
  UnidadCurricularRelevamientoDeDatosCSV,
  UnidadCurricularResponse,
} from '../types';
import { leerCSV } from '../utils';
import axios from 'axios';
import { env } from '../config';

const UBICACION_CSV_UCS_ACTUALES_PRIMER_SEMESTRE =
  '../../data/csv/ucs-actuales-primer-semestre.csv';
const UBICACION_CSV_UCS_ACTUALES_SEGUNDO_SEMESTRE =
  '../../data/csv/ucs-actuales-segundo-semestre.csv';

const UBICACION_DESTINO = '../../data/unidades-curriculares.json';

const generarUnidadesCurricularesJson = async (): Promise<void> => {
  try {
    const unidadesCurriculares = await obtenerUnidadesCurriculares();

    fs.writeFileSync(
      UBICACION_DESTINO,
      JSON.stringify(unidadesCurriculares, null, 4),
      'utf8'
    );
  } catch (error) {
    console.error(error);
  }
};

const obtenerUnidadesCurriculares = async (): Promise<UnidadCurricular[]> => {
  const ucsActualesPrimerSemestre = (await leerCSV(
    UBICACION_CSV_UCS_ACTUALES_PRIMER_SEMESTRE
  )) as UnidadCurricularRelevamientoDeDatosCSV[];
  const ucsActualesSegundoSemestre = (await leerCSV(
    UBICACION_CSV_UCS_ACTUALES_SEGUNDO_SEMESTRE
  )) as UnidadCurricularRelevamientoDeDatosCSV[];

  const url = `${env.PDF_PROCESSOR_SERVICE_URL}/unidades-curriculares`;

  const { data } = await axios.get<UnidadCurricularResponse[]>(url);

  if (!data) {
    throw new Error(
      'Ha ocurrido un error al fetchear las unidades curriculares'
    );
  }

  const unidadesCurriculares: UnidadCurricular[] = [];

  for (const unidadCurricular of data) {
    let semestres: SemestreDeDictado[] = [];
    if (
      ucsActualesPrimerSemestre.find(
        (uc) => uc.codigo === unidadCurricular.codigo
      )
    ) {
      semestres.push(SEMESTRE_DE_DICTADO.PRIMER_SEMESTRE);
    }
    if (
      ucsActualesSegundoSemestre.find(
        (uc) => uc.codigo === unidadCurricular.codigo
      )
    ) {
      semestres.push(SEMESTRE_DE_DICTADO.SEGUNDO_SEMESTRE);
    }

    const uc: UnidadCurricular = {
      nombre: unidadCurricular.nombre,
      codigo: unidadCurricular.codigo,
      creditos: +unidadCurricular.creditos,
      nombreGrupoPadre: unidadCurricular.nombre_grupo_padre,
      codigoGrupoPadre: unidadCurricular.codigo_grupo_padre,
      nombreGrupoHijo: unidadCurricular.nombre_grupo_hijo,
      codigoGrupoHijo: unidadCurricular.codigo_grupo_hijo,
      semestres: semestres.length > 0 ? semestres : null,
    };

    unidadesCurriculares.push(uc);
  }

  return unidadesCurriculares;
};

generarUnidadesCurricularesJson();
