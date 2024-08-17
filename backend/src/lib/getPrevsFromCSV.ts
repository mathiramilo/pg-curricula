import type { Prev, RawPrev } from '../types';
import { InstanceType, PrevType, RuleTypes } from '../types';
import readCSV from './readCSV';

const PREVS_CSV_PATH = 'data/previaturas2.csv';

export const main = async () => {
  try {
    const results = await readCSV(PREVS_CSV_PATH);
    const prevs = parsePrevsCSV(results as RawPrev[]);
    const globalPrevs = generateGlobalPrevsObject(prevs);

    console.log(JSON.stringify(globalPrevs['1918'], null, 2));
  } catch (error) {
    console.error(error);
  }
};

const parsePrevsCSV = (rows: RawPrev[]): { [key: string]: Prev[] } => {
  const UCs: { [key: string]: Prev[] } = {};

  rows.forEach(row => {
    // Ignorar las filas que corresponden a Examenes
    if (row.tipo_descriptor !== InstanceType.C) return;

    // Guardar la materia en el objeto
    const codMateria = row.codenservicio_mat;
    if (!UCs[codMateria]) {
      UCs[codMateria] = [];
    }

    // Convertir las columnas relevantes a los tipos apropiados
    UCs[codMateria].push({
      ucCode: parseInt(row.cod_materia),
      ucServiceCode: row.codenservicio_mat,
      ucName: row.nombre_mat,
      conditionCode: parseInt(row.cod_condicion),
      parentConditionCode: row.cod_condicion_padre
        ? parseInt(row.cod_condicion_padre)
        : null,
      type: PrevType[row.tipo] || row.tipo,
      amount: row.cantmaterias ? parseInt(row.cantmaterias) : null,
      planCode: row.cod_plan ? parseInt(row.cod_plan) : null,
      creditsAmount: row.cantcreditos ? parseInt(row.cantcreditos) : null,
      groupCode: row.cod_grupo ? parseInt(row.cod_grupo) : null,
      groupName: row.nombre_grupo || null,
      elementCode: row.cod_elemento ? parseInt(row.cod_elemento) : null,
      instanceType: InstanceType[row.tipo_instancia] || null,
      prevName: row['nombre_mat-2'] || null,
      prevServiceCode: row['codenservicio_mat-2'] || null
    });
  });

  return UCs;
};

const groupByField = (
  UCs: Prev[],
  field: keyof Prev
): {
  [key: string]: Prev[];
} => {
  return UCs.reduce(
    (groupedUCs, uc) => {
      const key = String(uc[field]);
      if (!groupedUCs[key]) {
        groupedUCs[key] = [];
      }
      groupedUCs[key].push(uc);
      return groupedUCs;
    },
    {} as { [key: string]: Prev[] }
  );
};

const generateGlobalPrevsObject = (groupedUCs: {
  [codMateria: number]: Prev[];
}) => {
  const globalPrevs = {};
  Object.entries(groupedUCs).forEach(
    ([codMateria, UCPrevs]) =>
      (globalPrevs[codMateria] = generateRootRulesObject(UCPrevs))
  );

  return globalPrevs;
};

const generateRootRulesObject = (prevs: Prev[]) => {
  const rootRow = prevs.find(prev => !prev.parentConditionCode);
  if (!rootRow) throw new Error('No se encontro nodo raiz');

  // TODO: Tenemos que agrupar cada grupo de filas de tipo B con el mismo cod_condicion y dejar solo una fila en prevs
  const groupedByType = groupByField(prevs, 'type');

  return generateRuleObject(rootRow, prevs);
};

const generateRuleObject = (row: Prev, prevs: Prev[]) => {
  const {
    creditsAmount,
    amount,
    conditionCode,
    prevServiceCode,
    groupCode,
    groupName,
    instanceType,
    type
  } = row;

  switch (type) {
    case PrevType.AND: {
      const ANDfilteredPrevs = prevs.filter(
        p => p.parentConditionCode === conditionCode
      );
      return {
        rule: RuleTypes.AND,
        prevs: ANDfilteredPrevs.map(prev => generateRuleObject(prev, prevs))
      };
    }
    case PrevType.OR: {
      const ORfilteredPrevs = prevs.filter(
        p => p.parentConditionCode === conditionCode
      );
      return {
        rule: RuleTypes.OR,
        prevs: ORfilteredPrevs.map(prev => generateRuleObject(prev, prevs))
      };
    }
    case PrevType.NOT: {
      const NOTPrev = prevs.find(p => p.parentConditionCode === conditionCode);
      if (!NOTPrev) return;
      return {
        rule: RuleTypes.NOT,
        prevs: generateRuleObject(NOTPrev, prevs)
      };
    }
    // B (SOME) => TODO: para cada regla B, se genera una regla SOME, cuando enrealidad solo deberia generarse una por cada conjunto de materias B con el mismo cod_condicion
    case PrevType.B: {
      const SOMEfilteredPrevs = prevs
        .filter(p => p.conditionCode === conditionCode)
        .map(p => ({ ...p, type: PrevType.M }));
      return {
        rule: RuleTypes.SOME,
        amount,
        prevs: SOMEfilteredPrevs.map(prev => generateRuleObject(prev, prevs))
      };
    }
    case PrevType.M: {
      return {
        rule: RuleTypes.UC,
        code: prevServiceCode,
        instance: instanceType
      };
    }
    case PrevType.D: {
      return {
        rule: RuleTypes.GROUP_CREDITS,
        code: groupCode,
        name: groupName,
        amount: creditsAmount
      };
    }
    case PrevType.R: {
      return {
        rule: RuleTypes.PLAN_CREDITS,
        amount: creditsAmount
      };
    }
    default: {
      console.log('Unknown rule type:', type);
    }
  }
};
