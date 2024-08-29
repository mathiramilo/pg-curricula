import type { InformacionEstudiante } from '@/types/informacionEstudiante';

import previaturas from '../../data/previaturas.json';
import cumplePrevias from './cumplePrevias';

const obtenerUCsHabilitadas = (
  informacionEstudiante: InformacionEstudiante,
  todas: boolean
): string[] => {
  const UCsHabilitadas: string[] = [];

  for (const nombreUC in previaturas) {
    // Si la UC ya fue aprobada, no la agregamos a las disponibles
    if (
      !todas &&
      informacionEstudiante['UCs Aprobadas'].hasOwnProperty(nombreUC)
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

export default obtenerUCsHabilitadas;
