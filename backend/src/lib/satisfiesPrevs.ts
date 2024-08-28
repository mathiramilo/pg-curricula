import { RuleTypes } from '../types/previas';

// Funcion recursiva que verifica si un estudiante cumple con las previas de una UC
const satisfiesPrevs = (studentData, prevs): boolean => {
  if (!prevs) {
    // Si la UC no tiene previas devolvemos true
    return true;
  }

  // console.log(prevs) // Debug

  try {
    switch (prevs.rule) {
      case RuleTypes.NOT:
        return !satisfiesPrevs(studentData, prevs.prevs);
      case RuleTypes.OR:
        return prevs.prevs.some(prev => satisfiesPrevs(studentData, prev));
      case RuleTypes.AND:
        return prevs.prevs.every(prev => satisfiesPrevs(studentData, prev));
      case RuleTypes.SOME:
        return (
          prevs.prevs.filter(prev => satisfiesPrevs(studentData, prev))
            .length >= prevs.amount
        );
      case RuleTypes.PLAN_CREDITS:
        return studentData['Creditos Totales'] >= prevs.amount;
      case RuleTypes.GROUP_CREDITS:
        return studentData[prevs.name] >= prevs.amount;
      case RuleTypes.UC:
        return studentData['UCs Aprobadas'].hasOwnProperty(prevs.name);
      default:
        console.log('Unknown rule:', prevs.rule);
        console.log(prevs);
        return true;
    }
  } catch (error) {
    console.log('Error:', error);
    return false;
  }
};

export default satisfiesPrevs;
