import { TipoInstancia } from './previas';

export type ReglaPreviaturas =
  | {
      regla: TipoRegla.AND;
      previas: ReglaPreviaturas[];
    }
  | {
      regla: TipoRegla.OR;
      previas: ReglaPreviaturas[];
    }
  | {
      regla: TipoRegla.NOT;
      previas: ReglaPreviaturas;
    }
  | {
      regla: TipoRegla.SOME;
      cantidad: number | null;
      previas: ReglaPreviaturas[];
    }
  | {
      regla: TipoRegla.UC;
      codigo: string | null;
      nombre: string | null;
      tipoInstancia: TipoInstancia | null;
    }
  | {
      regla: TipoRegla.CREDITOS_GRUPO;
      codigo: number | null;
      nombre: string | null;
      cantidad: number | null;
    }
  | {
      regla: TipoRegla.CREDITOS_PLAN;
      cantidad: number | null;
    }
  | undefined;

export enum TipoRegla {
  AND = 'AND',
  OR = 'OR',
  NOT = 'NOT',
  SOME = 'SOME',
  UC = 'UC',
  CREDITOS_GRUPO = 'CREDITOS_GRUPO',
  CREDITOS_PLAN = 'CREDITOS_PLAN'
}
