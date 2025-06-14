import {
  type InformacionEstudiante,
  ReglaPreviaturas,
  TIPO_REGLA,
} from '../types';

/**
 * Verifica si el estudiante cumple con las previaturas de una unidad curricular
 *
 * @param informacionEstudiante
 * @param previas
 * @returns `true` si cumple con las previaturas, `false` si no cumple
 */
export const cumplePreviaturas = (
  informacionEstudiante: InformacionEstudiante,
  previas: ReglaPreviaturas
): boolean => {
  if (!previas) return true;

  try {
    switch (previas.regla) {
      case TIPO_REGLA.NOT: {
        return !cumplePreviaturas(informacionEstudiante, previas.previas);
      }
      case TIPO_REGLA.OR: {
        return previas.previas.some((prev) =>
          cumplePreviaturas(informacionEstudiante, prev)
        );
      }
      case TIPO_REGLA.AND: {
        return previas.previas.every((prev) =>
          cumplePreviaturas(informacionEstudiante, prev)
        );
      }
      case TIPO_REGLA.SOME: {
        return (
          previas.previas.filter((prev) =>
            cumplePreviaturas(informacionEstudiante, prev)
          ).length >= previas.cantidad!
        );
      }
      case TIPO_REGLA.CREDITOS_PLAN: {
        return informacionEstudiante.creditosTotales >= previas.cantidad;
      }
      case TIPO_REGLA.CREDITOS_GRUPO: {
        return informacionEstudiante[previas.nombre] >= previas.cantidad;
      }
      case TIPO_REGLA.UC: {
        return informacionEstudiante.unidadesCurricularesAprobadas.hasOwnProperty(
          previas.codigo
        );
      }
    }
  } catch (error) {
    return false;
  }
};

/**
 * @param previas
 * @param listadoCodigosUCs
 * @returns Un array con los códigos de todas las UCs que aparecen en el arbol de previaturas, excepto las UCs que estan dentro de una regla 'NOT'
 */
export const obtenerCodigosUCsPrevias = (
  previas: ReglaPreviaturas,
  listadoCodigosUCs: string[]
) => {
  if (!previas) return;

  try {
    switch (previas.regla) {
      case TIPO_REGLA.OR: {
        return previas.previas.forEach((prev) =>
          obtenerCodigosUCsPrevias(prev, listadoCodigosUCs)
        );
      }
      case TIPO_REGLA.AND: {
        return previas.previas.forEach((prev) =>
          obtenerCodigosUCsPrevias(prev, listadoCodigosUCs)
        );
      }
      case TIPO_REGLA.SOME: {
        return previas.previas.forEach((prev) =>
          obtenerCodigosUCsPrevias(prev, listadoCodigosUCs)
        );
      }
      case TIPO_REGLA.UC: {
        if (previas.codigo) {
          if (!listadoCodigosUCs.includes(previas.codigo)) {
            listadoCodigosUCs.push(previas.codigo);
          }
        }
      }
    }
  } catch (error) {
    return;
  }
};
