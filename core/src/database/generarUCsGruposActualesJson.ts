import fs from 'fs';

import { UnidadCurricular } from '../types';
import ucsFing from '../../data/ucs-fing.json';

const UBICACION_DESTINO = '../../data/ucs-grupos-actuales.json';

const generarUCsGruposActualesJson = async (): Promise<void> => {
  try {
    const ucsGrupos = obtenerUCsGruposActuales(ucsFing as UnidadCurricular[]);

    fs.writeFileSync(
      UBICACION_DESTINO,
      JSON.stringify(ucsGrupos, null, 2),
      'utf8'
    );
  } catch (error) {
    console.error(error);
  }
};

const obtenerUCsGruposActuales = (
  unidadesCurriculares: UnidadCurricular[]
): { [clave: string]: string[] } => {
  const UCsGrupos: { [clave: string]: string[] } = {};

  unidadesCurriculares
    .filter((uc) => uc.semestres)
    .forEach((uc) => {
      const nombreGrupo = uc.nombreGrupoHijo;

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
        UCsGrupos['MATERIAS OPCIONALES']?.push(uc.codigoEnServicioUC);
      } else {
        UCsGrupos[nombreGrupo]?.push(uc.codigoEnServicioUC);
      }
    });

  return UCsGrupos;
};

generarUCsGruposActualesJson();
