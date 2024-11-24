import fs from 'fs';
import path from 'path';

import { UnidadCurricular, UnidadCurricularCSV } from '../types';
import { leerCSV } from './leerCSV';

const UBICACION_ARCHIVO = 'data/ucs-con-grupo.csv';

export const generarUCsGrupos = async (): Promise<void> => {
  try {
    const datos = await leerCSV(UBICACION_ARCHIVO);
    const ucsGrupos = obtenerUCsGrupos(datos as UnidadCurricularCSV[]);

    const ubicacionDestino = path.join(__dirname, '../../data/ucs-grupos.json');
    fs.writeFileSync(
      ubicacionDestino,
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
  filas: UnidadCurricularCSV[]
): { [clave: string]: UnidadCurricular[] } => {
  const UCsGrupos: { [clave: string]: UnidadCurricular[] } = {};

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
