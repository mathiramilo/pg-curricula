import {
  type InformacionEstudiante,
  ReglaPreviaturas,
  TIPO_REGLA,
} from '../types';

// Funcion recursiva que verifica si un estudiante cumple con las previas de una UC
export const cumplePrevias = (
  informacionEstudiante: InformacionEstudiante,
  previas: ReglaPreviaturas
): boolean => {
  // Si la UC no tiene previas devolvemos true
  if (!previas) return true;

  try {
    switch (previas.regla) {
      case TIPO_REGLA.NOT: {
        // Hay casos donde tenemos un objeto asi: { regla: "NOT" }, en este caso se devuelve true
        if (!previas.previas) return true;

        // Si la regla hija es UC y tiene el nombre 'null', entonces se devuelve true. Esto es necesario ya que si entra en el caso 'UC' se va a devolver true, pero como la regla es NOT, se niega el valor (CASO BORDE, pasa en Proyecto de Grado por ejemplo)
        if (previas.previas.regla === TIPO_REGLA.UC && !previas.previas.nombre)
          return true;

        return !cumplePrevias(informacionEstudiante, previas.previas);
      }
      case TIPO_REGLA.OR: {
        return previas.previas.some((prev) =>
          cumplePrevias(informacionEstudiante, prev)
        );
      }
      case TIPO_REGLA.AND: {
        return previas.previas.every((prev) =>
          cumplePrevias(informacionEstudiante, prev)
        );
      }
      case TIPO_REGLA.SOME: {
        return (
          previas.previas.filter((prev) =>
            cumplePrevias(informacionEstudiante, prev)
          ).length >= previas.cantidad!
        );
      }
      case TIPO_REGLA.CREDITOS_PLAN: {
        if (previas.cantidad)
          return informacionEstudiante.creditosTotales >= previas.cantidad;
        return true; // Si falta el valor del campo, podemos asumir que es un error del CSV de previaturas proporcionado por SECIU, como esto es muy poco usual, la mejor opcion es retornar true
      }
      case TIPO_REGLA.CREDITOS_GRUPO: {
        if (previas.nombre && previas.cantidad)
          return informacionEstudiante[previas.nombre] >= previas.cantidad;
        return true;
      }
      case TIPO_REGLA.UC: {
        if (previas.codigo)
          return informacionEstudiante.unidadesCurricularesAprobadas.hasOwnProperty(
            previas.codigo
          );
        return true;
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
