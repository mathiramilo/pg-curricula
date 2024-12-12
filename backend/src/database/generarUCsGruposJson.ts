import fs from 'fs';

import { UnidadCurricularConGrupo, UnidadCurricularConGrupoCSV, UnidadCurricularCSV } from '../types';
import { leerCSV } from '../lib/leerCSV';

const UBICACION_CSV_UCS_CON_GRUPO = '../../data/ucs-con-grupo.csv';
const UBICACION_DESTINO = '../../data/ucs-grupos.json';

const generarUCsGrupos = async (): Promise<void> => {
  try {
    const datos = await leerCSV(UBICACION_CSV_UCS_CON_GRUPO);
    const ucsGrupos = obtenerUCsGrupos(datos as UnidadCurricularCSV[]);

    fs.writeFileSync(
      UBICACION_DESTINO,
      JSON.stringify(ucsGrupos, null, 2),
      'utf8'
    );
  } catch (error) {
    console.error(error);
  }
};

const obtenerUCsGrupos = (
  filas: UnidadCurricularCSV[]
): { [clave: string]: string[] } => {
  const UCsGrupos: { [clave: string]: string[] } = {};

  filas.forEach(fila => {
    const nombreGrupo = fila.nombreh;

    if (nombreGrupo === '') {
      if (!UCsGrupos['MATERIAS OPCIONALES']) {
        UCsGrupos['MATERIAS OPCIONALES'] = [];
      }
    } else {
      if (!UCsGrupos[nombreGrupo]) {
        UCsGrupos[nombreGrupo] = [];
      }
    }

    if (nombreGrupo === '') {
      UCsGrupos['MATERIAS OPCIONALES']?.push(fila.nombre_mat);
    } else {
      UCsGrupos[nombreGrupo]?.push(fila.nombre_mat);
    }
  });

  return UCsGrupos;
};

const parsearUCsGrupos = (
  filas: UnidadCurricularConGrupoCSV[]
): { [clave: string]: UnidadCurricularConGrupo[] } => {
  const UCsGrupos: { [clave: string]: UnidadCurricularConGrupo[] } = {};

  filas.forEach(fila => {
    const nombreUC = fila.nombre_mat;
    if (!UCsGrupos[nombreUC]) {
      UCsGrupos[nombreUC] = [];
    }

    UCsGrupos[nombreUC].push({
      nombreGrupoPadre: fila.nombrep,
      codigoGrupoPadre: parseInt(fila.codigogrupop),
      nombreGrupoHijo: fila.nombreh,
      codigoGrupoHijo: parseInt(fila.codigogrupoh),
      nombreUC: fila.nombre_mat,
      codigoUC: parseInt(fila.codigo_materia),
      codigoEnServicioUC: fila.codenservicio_mat
    });
  });

  return UCsGrupos;
};

generarUCsGrupos();
