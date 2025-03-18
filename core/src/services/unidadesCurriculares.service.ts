import { UnidadCurricular, type InformacionEstudiante } from '@/types';

import previaturas from '../../data/previaturas.json';
import trayectoriaSugerida from '../../data/trayectoria-sugerida.json';
import ucsFing from '../../data/ucs-fing.json';
import { cumplePrevias } from './previas.service';

interface ObtenerUnidadesCurricularesFilter {
  nombre?: string;
  grupo?: string;
  minCreditos?: string;
  maxCreditos?: string;
  habilitadas?: string;
}

// TODO: Implementar paginación y ordenamiento
export const obtenerUnidadesCurriculares = (
  informacionEstudiante: InformacionEstudiante,
  filter: ObtenerUnidadesCurricularesFilter
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

  const soloHabilitadas = filter.habilitadas === 'true';

  if (soloHabilitadas) {
    unidadesCurriculares = unidadesCurriculares.filter((uc) =>
      cumplePrevias(informacionEstudiante, previaturas[uc.codigoEnServicioUC])
    );
  }

  return unidadesCurriculares;
};

export const obtenerTrayectoriaSugerida = () => {
  const unidadesCurricularesMap = new Map<string, UnidadCurricular>();
  for (const uc of ucsFing) {
    unidadesCurricularesMap.set(uc.codigoEnServicioUC, uc as UnidadCurricular);
  }

  const codigosIncluidos = new Set<string>();

  const trayectoriaProcesada = trayectoriaSugerida.map((semestre) => {
    const unidadesCurricularesProcesadas = semestre.unidadesCurriculares.map(
      (codigoUC) => {
        codigosIncluidos.add(codigoUC);
        return unidadesCurricularesMap.get(codigoUC);
      }
    );

    return {
      ...semestre,
      unidadesCurriculares: unidadesCurricularesProcesadas,
    };
  });

  const unidadesNoIncluidas = Array.from(
    unidadesCurricularesMap.values()
  ).filter((uc) => !codigosIncluidos.has(uc.codigoEnServicioUC));

  return [
    ...trayectoriaProcesada,
    {
      semestre: null,
      unidadesCurriculares: unidadesNoIncluidas,
    },
  ];
};

export const obtenerUnidadesCurricularesHabilitadas = (
  informacionEstudiante: InformacionEstudiante,
  todas: boolean
): string[] => {
  const UCsHabilitadas: string[] = [];

  for (const nombreUC in previaturas) {
    // Si la UC ya fue aprobada, no la agregamos a las disponibles
    if (
      !todas &&
      informacionEstudiante.unidadesCurricularesAprobadas.hasOwnProperty(
        nombreUC
      )
    ) {
      continue;
    }
    // Si cumple con las previas, la agregamos a las disponibles
    if (cumplePrevias(informacionEstudiante, previaturas[nombreUC])) {
      UCsHabilitadas.push(nombreUC);
    }
  }

  return UCsHabilitadas;
};
