import { TipoInstancia } from ".";

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
      cantidad: number;
      previas: ReglaPreviaturas[];
    }
  | {
      regla: typeof TIPO_REGLA.UC;
      codigo: string;
      nombre: string;
      tipoInstancia: TipoInstancia;
    }
  | {
      regla: typeof TIPO_REGLA.CREDITOS_GRUPO;
      codigo: number;
      nombre: string;
      cantidad: number;
    }
  | {
      regla: typeof TIPO_REGLA.CREDITOS_PLAN;
      cantidad: number;
    }
  | undefined;

export const TIPO_REGLA = {
  AND: "AND",
  OR: "OR",
  NOT: "NOT",
  SOME: "SOME",
  UC: "UC",
  CREDITOS_GRUPO: "CREDITOS_GRUPO",
  CREDITOS_PLAN: "CREDITOS_PLAN",
} as const;
