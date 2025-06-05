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
  codigo: string;
  nombre: string;
  creditos: number;
  codigoGrupoPadre: string;
  nombreGrupoPadre: Area;
  codigoGrupoHijo: string;
  nombreGrupoHijo: Grupo;
  semestres: number[];
}

export type UnidadCurricularAprobada = Pick<
  UnidadCurricular,
  "codigo" | "creditos" | "nombre" | "nombreGrupoPadre" | "nombreGrupoHijo"
> & {
  tipoAprobacion?: TipoAprobacion;
  concepto?: string | null;
  fecha?: string;
};

export type InformacionEstudiante = {
  unidadesCurricularesAprobadas: Record<
    UnidadCurricular["codigo"],
    UnidadCurricularAprobada
  >;
  creditosTotales: number;
} & Record<Grupo, number>;

export interface TrayectoriaSugeridaSemestre {
  semestre: number | null;
  unidadesCurriculares: UnidadCurricular[];
}

export interface ReglaAnd {
  regla: typeof TIPO_REGLA.AND;
  previas: ReglaPreviaturas[];
}

export interface ReglaOr {
  regla: typeof TIPO_REGLA.OR;
  previas: ReglaPreviaturas[];
}

export interface ReglaNot {
  regla: typeof TIPO_REGLA.NOT;
  previas: ReglaPreviaturas;
}

export interface ReglaSome {
  regla: typeof TIPO_REGLA.SOME;
  cantidad: number;
  previas: ReglaPreviaturas[];
}

export interface ReglaUc {
  regla: typeof TIPO_REGLA.UC;
  codigo: string;
  nombre: string;
  tipoInstancia: TipoInstancia;
}

export interface ReglaCreditosGrupo {
  regla: typeof TIPO_REGLA.CREDITOS_GRUPO;
  codigo: number;
  nombre: string;
  cantidad: number;
}

export interface ReglaCreditosPlan {
  regla: typeof TIPO_REGLA.CREDITOS_PLAN;
  cantidad: number;
}

export type ReglaPreviaturas =
  | ReglaAnd
  | ReglaOr
  | ReglaNot
  | ReglaSome
  | ReglaUc
  | ReglaCreditosGrupo
  | ReglaCreditosPlan
  | undefined;

export type UnidadCurricularItemType = "aprobacion" | "creditos";

export interface SemestrePlanCarrera {
  semestre: number;
  unidadesCurriculares: UnidadCurricular[];
  creditos: number;
  label?: string;
}

export type PlanCarrera = SemestrePlanCarrera[];

export interface Option {
  label: string;
  value: string;
}
