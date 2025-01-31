import { TipoInstancia } from '.';

export type ReglaPreviaturas =
  | {
      regla: typeof TIPO_REGLA.AND;
      previas: ReglaPreviaturas[];
    }
  | {
      regla: typeof TIPO_REGLA.OR;
      previas: ReglaPreviaturas[];
    }
  | {
      regla: typeof TIPO_REGLA.NOT;
      previas: ReglaPreviaturas;
    }
  | {
      regla: typeof TIPO_REGLA.SOME;
      cantidad: number | null;
      previas: ReglaPreviaturas[];
    }
  | {
      regla: typeof TIPO_REGLA.UC;
      codigo: string | null;
      nombre: string | null;
      tipoInstancia: TipoInstancia | null;
    }
  | {
      regla: typeof TIPO_REGLA.CREDITOS_GRUPO;
      codigo: number | null;
      nombre: string | null;
      cantidad: number | null;
    }
  | {
      regla: typeof TIPO_REGLA.CREDITOS_PLAN;
      cantidad: number | null;
    }
  | undefined;

export const TIPO_REGLA = {
  AND: 'AND',
  OR: 'OR',
  NOT: 'NOT',
  SOME: 'SOME',
  UC: 'UC',
  CREDITOS_GRUPO: 'CREDITOS_GRUPO',
  CREDITOS_PLAN: 'CREDITOS_PLAN'
} as const;
export type TipoRegla = (typeof TIPO_REGLA)[keyof typeof TIPO_REGLA];
