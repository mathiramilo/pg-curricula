import type { InformacionEstudiante } from '../types/informacionEstudiante';
import { ReglaPreviaturas, TipoRegla } from '../types/reglas';

// Funcion recursiva que verifica si un estudiante cumple con las previas de una UC
const cumplePrevias = (
  informacionEstudiante: InformacionEstudiante,
  previas: ReglaPreviaturas
): boolean => {
  // Si la UC no tiene previas devolvemos true
  if (!previas) return true;

  // console.log(previas); // Debug

  try {
    switch (previas.regla) {
      case TipoRegla.NOT:
        return !cumplePrevias(informacionEstudiante, previas.previas);
      case TipoRegla.OR:
        return previas.previas.some(prev =>
          cumplePrevias(informacionEstudiante, prev)
        );
      case TipoRegla.AND:
        return previas.previas.every(prev =>
          cumplePrevias(informacionEstudiante, prev)
        );
      case TipoRegla.SOME:
        return (
          previas.previas.filter(prev =>
            cumplePrevias(informacionEstudiante, prev)
          ).length >= previas.cantidad!
        );
      case TipoRegla.CREDITOS_PLAN:
        return informacionEstudiante['Creditos Totales'] >= previas.cantidad!;
      case TipoRegla.CREDITOS_GRUPO:
        return informacionEstudiante[previas.nombre!] >= previas.cantidad!;
      case TipoRegla.UC:
        return informacionEstudiante['UCs Aprobadas'].hasOwnProperty(
          previas.nombre!
        );
      default:
        // console.log('Regla desconocida:', previas.regla);
        // console.log(previas);
        return true;
    }
  } catch (error) {
    // console.log('Error:', error);
    return false;
  }
};

export default cumplePrevias;
