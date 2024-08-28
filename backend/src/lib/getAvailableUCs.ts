import type { StudentData } from 'types/studentData';

import globalPrevs from '../../data/global-prevs.json';
import satisfiesPrevs from './satisfiesPrevs';

const getAvailableUCs = (studentData: StudentData, all: boolean): string[] => {
  const availableUCs: string[] = [];

  for (const uc in globalPrevs) {
    // Si la UC ya fue aprobada, no la agregamos a las disponibles
    if (!all && studentData['UCs Aprobadas'].hasOwnProperty(uc)) {
      continue;
    }
    // Si cumple con las previas, la agregamos a las disponibles
    if (satisfiesPrevs(studentData, globalPrevs[uc])) {
      availableUCs.push(uc);
    }
  }

  return availableUCs;
};

export default getAvailableUCs;
