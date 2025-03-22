import type { ComponentPropsWithoutRef } from "react";

import type {
  AREA,
  GRUPO,
  SEMESTRE_DE_DICTADO,
  TIPO_APROBACION,
} from "./constants";

export type SvgProps = ComponentPropsWithoutRef<"svg">;

export type Area = (typeof AREA)[keyof typeof AREA];
export type Grupo = (typeof GRUPO)[keyof typeof GRUPO];
export type TipoAprobacion =
  (typeof TIPO_APROBACION)[keyof typeof TIPO_APROBACION];
export type SemestreDeDictado =
  (typeof SEMESTRE_DE_DICTADO)[keyof typeof SEMESTRE_DE_DICTADO];

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
