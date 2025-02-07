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

  // console.log(JSON.stringify(previas, null, 2)); // Debug

  try {
    switch (previas.regla) {
      case TIPO_REGLA.NOT: {
        //* Si la regla hija es UC y tiene el nombre 'null', entonces se devuelve true. Esto es necesario ya que si entra en el caso 'UC' se va a devolver true, pero como la regla es NOT, se niega el valor (CASO BORDE, pasa en Proyecto de Grado por ejemplo)
        if (previas.previas?.regla === TIPO_REGLA.UC && !previas.previas.nombre)
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
        if (previas.nombre)
          return informacionEstudiante.unidadesCurricularesAprobadas.hasOwnProperty(
            previas.nombre
          );
        return true;
      }
    }
  } catch (error) {
    // console.log('Error:', error);
    return false;
  }
};
