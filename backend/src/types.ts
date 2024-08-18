export interface RawPrev {
  cod_materia: string;
  codenservicio_mat: string;
  nombre_mat: string;
  tipo_descriptor: string;
  cod_condicion: string;
  cod_condicion_padre: string;
  tipo: string;
  cantmaterias: string;
  cod_plan: string;
  cantcreditos: string;
  cod_grupo: string;
  nombre_grupo: string;
  cod_elemento: string;
  tipo_instancia: string;
  'nombre_mat-2': string;
  'codenservicio_mat-2': string;
}

export interface Prev {
  ucCode: number;
  ucServiceCode: string;
  ucName: string;
  conditionCode: number;
  parentConditionCode: number | null;
  type: PrevType;
  amount: number | null;
  planCode: number | null;
  creditsAmount: number | null;
  groupCode: number | null;
  groupName: string | null;
  elementCode: number | null;
  instanceType: InstanceType | null;
  prevName: string | null;
  prevServiceCode: string | null;
}

export enum InstanceType {
  C = 'C',
  E = 'E'
}

export enum PrevType {
  AND = 'AND',
  OR = 'OR',
  NOT = 'NOT',
  B = 'B',
  M = 'M',
  D = 'D',
  R = 'R'
}

export enum RuleTypes {
  AND = 'AND',
  OR = 'OR',
  NOT = 'NOT',
  SOME = 'SOME',
  UC = 'UC',
  GROUP_CREDITS = 'GROUP_CREDITS',
  PLAN_CREDITS = 'PLAN_CREDITS'
}
