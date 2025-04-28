import fs from 'fs';

import { UnidadCurricular } from '../types';
import unidadesCurriculares from '../../data/unidades-curriculares.json';
import unidadesCurricularesObligatorias from '../../data/ucs-obligatorias.json';

const UBICACION_DESTINO_1 = '../../data/ucs-grupos-actuales.json';
const UBICACION_DESTINO_2 = '../../data/ucs-optativas-grupos-actuales.json';

const generarUCsGruposActualesJson = async (): Promise<void> => {
  try {
    const ucsGrupos = obtenerUCsGruposActuales(
      unidadesCurriculares as UnidadCurricular[]
    );

    fs.writeFileSync(
      UBICACION_DESTINO_1,
      JSON.stringify(ucsGrupos, null, 4),
      'utf8'
    );
  } catch (error) {
    console.error(error);
  }
};

const generarUCsOptativasGruposActualesJson = async (): Promise<void> => {
  try {
    const ucsGrupos = obtenerUCsGruposActuales(
      unidadesCurriculares as UnidadCurricular[]
    );

    const codigosObligatorios = new Set(
      unidadesCurricularesObligatorias.map(({ codigo }) => codigo)
    );

    for (const grupo in ucsGrupos) {
      ucsGrupos[grupo] = ucsGrupos[grupo]?.filter(
        (uc) => !codigosObligatorios.has(uc)
      )!;
    }

    fs.writeFileSync(
      UBICACION_DESTINO_2,
      JSON.stringify(ucsGrupos, null, 4),
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
        UCsGrupos['MATERIAS OPCIONALES']?.push(uc.codigo);
      } else {
        UCsGrupos[nombreGrupo]?.push(uc.codigo);
      }
    });

  return UCsGrupos;
};

generarUCsGruposActualesJson();
generarUCsOptativasGruposActualesJson();
