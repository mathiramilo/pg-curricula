import type { ComponentPropsWithoutRef } from "react";

import type {
  AREA,
  GRUPO,
  SEMESTRE_DE_DICTADO,
  TIPO_APROBACION,
  TIPO_INSTANCIA,
  TIPO_REGLA,
} from "./constants";

export type SvgProps = ComponentPropsWithoutRef<"svg">;

export type Area = (typeof AREA)[keyof typeof AREA];
export type Grupo = (typeof GRUPO)[keyof typeof GRUPO];
export type TipoAprobacion =
  (typeof TIPO_APROBACION)[keyof typeof TIPO_APROBACION];
export type SemestreDeDictado =
  (typeof SEMESTRE_DE_DICTADO)[keyof typeof SEMESTRE_DE_DICTADO];
export type TipoRegla = (typeof TIPO_REGLA)[keyof typeof TIPO_REGLA];
export type TipoInstancia =
  (typeof TIPO_INSTANCIA)[keyof typeof TIPO_INSTANCIA];

export interface UnidadCurricular {
  codigoEnServicioUC: string;
  nombreUC: string;
  codigoUC: string;
  tipoUC: string;
  creditosUC: number;
  nombreGrupoPadre: Area;
  codigoGrupoPadre: number;
  nombreGrupoHijo: Grupo;
  codigoGrupoHijo: number;
  semestres: number[];
}

export type UnidadCurricularAprobada = Pick<
  UnidadCurricular,
  | "codigoEnServicioUC"
  | "creditosUC"
  | "nombreUC"
  | "nombreGrupoPadre"
  | "nombreGrupoHijo"
> & {
  tipoAprobacion?: TipoAprobacion;
  concepto?: string | null;
  fecha?: string;
};

export type InformacionEstudiante = {
  unidadesCurricularesAprobadas: Record<
    UnidadCurricular["codigoEnServicioUC"],
    UnidadCurricularAprobada
  >;
  creditosTotales: number;
} & Record<Grupo, number>;

export interface TrayectoriaSugeridaSemestre {
  semestre: number | null;
  unidadesCurriculares: UnidadCurricular[];
}

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
