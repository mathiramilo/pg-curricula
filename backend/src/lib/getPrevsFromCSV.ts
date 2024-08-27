import fs from 'fs';
import path from 'path';

import type { Prev, RawPrev } from '../types/previas';
import { InstanceType, PrevType, RuleTypes } from '../types/previas';
import readCSV from './readCSV';

const PREVS_CSV_PATH = 'data/previaturas2.csv';

export const main = async () => {
  try {
    const results = await readCSV(PREVS_CSV_PATH);
    const prevs = parsePrevsCSV(results as RawPrev[]);
    const globalPrevs = generateGlobalPrevsObject(prevs);

    const outputPath = path.join(__dirname, '../../data/global-prevs.json');
    fs.writeFileSync(outputPath, JSON.stringify(globalPrevs, null, 2), 'utf8');
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
  [ucServiceCode: number]: Prev[];
}) => {
  const globalPrevs = {};
  Object.entries(groupedUCs).forEach(
    ([ucServiceCode, UCPrevs]) =>
      (globalPrevs[ucServiceCode] = generateRootRulesObject(UCPrevs))
  );

  return globalPrevs;
};

const generateRootRulesObject = (prevs: Prev[]) => {
  const rootRow = prevs.find(prev => !prev.parentConditionCode);
  if (!rootRow) throw new Error('No se encontro nodo raiz');

  // Agrupar filas de tipo B por cod_condicion y dejar solo una fila en prevs
  const rowsOfTypeB = prevs.filter(p => p.type === PrevType.B);
  const groupedByConditionCode = groupByField(rowsOfTypeB, 'conditionCode');
  const groupedByConditionCodeKeys = Object.keys(groupedByConditionCode);

  const formattedPrevs = prevs.filter(p => p.type !== PrevType.B);
  groupedByConditionCodeKeys.forEach(conditionCode => {
    const prevs = groupedByConditionCode[conditionCode];
    const prev = prevs[0];
    formattedPrevs.push(prev);
  });

  return generateRuleObject(rootRow, groupedByConditionCode, formattedPrevs);
};

const generateRuleObject = (
  row: Prev,
  prevsOfTypeB: { [conditionCode: string]: Prev[] },
  formattedPrevs: Prev[]
) => {
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
      const ANDfilteredPrevs = formattedPrevs.filter(
        p => p.parentConditionCode === conditionCode
      );
      return {
        rule: RuleTypes.AND,
        prevs: ANDfilteredPrevs.map(prev =>
          generateRuleObject(prev, prevsOfTypeB, formattedPrevs)
        )
      };
    }
    case PrevType.OR: {
      const ORfilteredPrevs = formattedPrevs.filter(
        p => p.parentConditionCode === conditionCode
      );
      return {
        rule: RuleTypes.OR,
        prevs: ORfilteredPrevs.map(prev =>
          generateRuleObject(prev, prevsOfTypeB, formattedPrevs)
        )
      };
    }
    case PrevType.NOT: {
      const NOTPrev = formattedPrevs.find(
        p => p.parentConditionCode === conditionCode
      );
      if (!NOTPrev) return;
      return {
        rule: RuleTypes.NOT,
        prevs: generateRuleObject(NOTPrev, prevsOfTypeB, formattedPrevs)
      };
    }
    case PrevType.B: {
      const BPrevs = prevsOfTypeB[conditionCode].map(p => ({
        ...p,
        type: PrevType.M
      }));
      return {
        rule: RuleTypes.SOME,
        amount,
        prevs: BPrevs.map(prev =>
          generateRuleObject(prev, prevsOfTypeB, formattedPrevs)
        )
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
      // TODO: Ver que hacer con las filas de tipo N, C, I y K
      console.log('Unknown rule type:', type);
    }
  }
};
