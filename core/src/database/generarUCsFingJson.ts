import fs from 'fs';

import {
  GrupoHijo,
  GrupoPadre,
  SEMESTRE_DE_DICTADO,
  SemestreDeDictado,
  TipoUC,
  UnidadCurricular,
  UnidadCurricularCSV,
  UnidadCurricularRelevamientoDeDatosCSV,
} from '../types';
import { leerCSV, eliminarTildes } from '../utils';

const UBICACION_CSV_UCS_FING = '../../data/csv/ucs-fing.csv';
const UBICACION_CSV_UCS_ACTUALES_PRIMER_SEMESTRE =
  '../../data/csv/ucs-actuales-primer-semestre.csv';
const UBICACION_CSV_UCS_ACTUALES_SEGUNDO_SEMESTRE =
  '../../data/csv/ucs-actuales-segundo-semestre.csv';

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
  const ucsActualesPrimerSemestre = (await leerCSV(
    UBICACION_CSV_UCS_ACTUALES_PRIMER_SEMESTRE
  )) as UnidadCurricularRelevamientoDeDatosCSV[];
  const ucsActualesSegundoSemestre = (await leerCSV(
    UBICACION_CSV_UCS_ACTUALES_SEGUNDO_SEMESTRE
  )) as UnidadCurricularRelevamientoDeDatosCSV[];
  const ucsFing = (await leerCSV(
    UBICACION_CSV_UCS_FING
  )) as UnidadCurricularCSV[];

  const unidadesCurriculares: UnidadCurricular[] = [];

  for (const ucFing of ucsFing) {
    let semestres: SemestreDeDictado[] = [];
    if (
      ucsActualesPrimerSemestre.find(
        (uc) => uc.codigo === ucFing.codenservicio_mat
      )
    ) {
      semestres.push(SEMESTRE_DE_DICTADO.PRIMER_SEMESTRE);
    }
    if (
      ucsActualesSegundoSemestre.find(
        (uc) => uc.codigo === ucFing.codenservicio_mat
      )
    ) {
      semestres.push(SEMESTRE_DE_DICTADO.SEGUNDO_SEMESTRE);
    }

    const uc: UnidadCurricular = {
      nombreUC: ucFing.nombre_mat,
      codigoEnServicioUC: ucFing.codenservicio_mat,
      codigoUC: +ucFing.codigo_materia,
      tipoUC: ucFing.tipo_mat as TipoUC,
      creditosUC: +ucFing.creditos_mat,
      nombreGrupoPadre: ucFing.nombrep as GrupoPadre,
      codigoGrupoPadre: +ucFing.codigogrupop,
      nombreGrupoHijo: ucFing.nombreh as GrupoHijo,
      codigoGrupoHijo: +ucFing.codigogrupoh,
      semestres: semestres.length > 0 ? semestres : null,
    };

    unidadesCurriculares.push(uc);
  }

  return unidadesCurriculares;
};

generarUCsFingJson();
