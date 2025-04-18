import fs from 'fs';

import { UnidadCurricular } from '../types';
import unidadesCurriculares from '../../data/unidades-curriculares.json';

const UBICACION_DESTINO = '../../data/ucs-grupos.json';

const generarUCsGruposJson = async (): Promise<void> => {
  try {
    const ucsGrupos = obtenerUCsGrupos(
      unidadesCurriculares as UnidadCurricular[]
    );

    fs.writeFileSync(
      UBICACION_DESTINO,
      JSON.stringify(ucsGrupos, null, 4),
      'utf8'
    );
  } catch (error) {
    console.error(error);
  }
};

const obtenerUCsGrupos = (
  unidadesCurriculares: UnidadCurricular[]
): { [clave: string]: string[] } => {
  const UCsGrupos: { [clave: string]: string[] } = {};

  unidadesCurriculares.forEach((uc) => {
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
      UCsGrupos['MATERIAS OPCIONALES']?.push(uc.codigo);
    } else {
      UCsGrupos[nombreGrupo]?.push(uc.codigo);
    }
  });

  return UCsGrupos;
};

generarUCsGruposJson();
