import {
  SemestreDeDictado,
  UnidadCurricular,
  type InformacionEstudiante,
} from '@/types';

import previaturas from '../../data/previaturas.json';
import trayectoriaSugerida from '../../data/trayectoria-sugerida.json';
import ucsFing from '../../data/ucs-fing.json';
import { cumplePrevias } from './previas.service';

type ObtenerUnidadesCurricularesFilter = Partial<{
  nombre: string;
  grupo: string;
  minCreditos: string;
  maxCreditos: string;
  semestresDeDictado: string;
  habilitadas: string;
  aprobadas: string;
}>;

export const obtenerUnidadesCurriculares = (
  informacionEstudiante: InformacionEstudiante,
  filter: ObtenerUnidadesCurricularesFilter,
  page: number,
  pageSize: number = 60
) => {
  let unidadesCurriculares = ucsFing;

  if (filter.nombre) {
    unidadesCurriculares = unidadesCurriculares.filter((uc) =>
      uc.nombreUC.toLowerCase().includes(filter.nombre!.toLowerCase())
    );
  }

  if (filter.grupo) {
    unidadesCurriculares = unidadesCurriculares.filter(
      (uc) => uc.nombreGrupoHijo.toLowerCase() === filter.grupo?.toLowerCase()
    );
  }

  if (filter.minCreditos) {
    unidadesCurriculares = unidadesCurriculares.filter(
      (uc) => uc.creditosUC >= +filter.minCreditos!
    );
  }

  if (filter.maxCreditos) {
    unidadesCurriculares = unidadesCurriculares.filter(
      (uc) => uc.creditosUC <= +filter.maxCreditos!
    );
  }

  const semestres = JSON.parse(
    filter.semestresDeDictado || '[]'
  ) as SemestreDeDictado[];

  if (semestres.length) {
    unidadesCurriculares = unidadesCurriculares.filter(
      (uc) =>
        uc.semestres &&
        uc.semestres.some((semestre) =>
          semestres.includes(semestre as SemestreDeDictado)
        )
    );
  }

  const soloHabilitadas = filter.habilitadas === 'true';

  if (soloHabilitadas) {
    unidadesCurriculares = unidadesCurriculares.filter(
      (uc) =>
        uc.semestres &&
        cumplePrevias(informacionEstudiante, previaturas[uc.codigoEnServicioUC])
    );
  }

  const aprobadas = filter.aprobadas === 'true';

  if (aprobadas) {
    unidadesCurriculares = unidadesCurriculares.filter((uc) =>
      Object.keys(informacionEstudiante.unidadesCurricularesAprobadas).includes(
        uc.codigoEnServicioUC
      )
    );
  }

  const totalItems = unidadesCurriculares.length;
  const startIndex = (page - 1) * pageSize;
  const paginatedData = unidadesCurriculares.slice(
    startIndex,
    startIndex + pageSize
  );

  return {
    data: paginatedData,
    page,
    pageSize,
    totalItems,
  };
};

export const obtenerTrayectoriaSugerida = () => {
  const unidadesCurricularesMap = new Map<string, UnidadCurricular>();
  for (const uc of ucsFing) {
    unidadesCurricularesMap.set(uc.codigoEnServicioUC, uc as UnidadCurricular);
  }

  const codigosIncluidos = new Set<string>();

  const trayectoriaProcesada = trayectoriaSugerida.map((semestre) => {
    const unidadesCurricularesProcesadas = semestre.unidadesCurriculares.map(
      ({ codigo }) => {
        codigosIncluidos.add(codigo);
        return unidadesCurricularesMap.get(codigo);
      }
    );

    return {
      ...semestre,
      unidadesCurriculares: unidadesCurricularesProcesadas,
    };
  });

  const unidadesCurricularesNoIncluidas = Array.from(
    unidadesCurricularesMap.values()
  ).filter(
    (uc) => !codigosIncluidos.has(uc.codigoEnServicioUC) && uc.semestres
  );

  return [
    ...trayectoriaProcesada,
    {
      semestre: null,
      unidadesCurriculares: unidadesCurricularesNoIncluidas,
    },
  ];
};
