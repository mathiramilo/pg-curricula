import { TipoInstancia } from './previas';

export type ReglaPreviaturas =
  | {
      regla: typeof TipoRegla.AND;
      previas: ReglaPreviaturas[];
    }
  | {
      regla: typeof TipoRegla.OR;
      previas: ReglaPreviaturas[];
    }
  | {
      regla: typeof TipoRegla.NOT;
      previas: ReglaPreviaturas;
    }
  | {
      regla: typeof TipoRegla.SOME;
      cantidad: number | null;
      previas: ReglaPreviaturas[];
    }
  | {
      regla: typeof TipoRegla.UC;
      codigo: string | null;
      nombre: string | null;
      tipoInstancia: TipoInstancia | null;
    }
  | {
      regla: typeof TipoRegla.CREDITOS_GRUPO;
      codigo: number | null;
      nombre: string | null;
      cantidad: number | null;
    }
  | {
      regla: typeof TipoRegla.CREDITOS_PLAN;
      cantidad: number | null;
    }
  | undefined;

export const TipoRegla = {
  AND: 'AND',
  OR: 'OR',
  NOT: 'NOT',
  SOME: 'SOME',
  UC: 'UC',
  CREDITOS_GRUPO: 'CREDITOS_GRUPO',
  CREDITOS_PLAN: 'CREDITOS_PLAN'
} as const;
export type TipoRegla = (typeof TipoRegla)[keyof typeof TipoRegla];
