import type { ComponentPropsWithoutRef } from "react";

import type { AREA, GRUPO, TIPO_APROBACION } from "./constants";

export type SvgProps = ComponentPropsWithoutRef<"svg">;

export type Area = (typeof AREA)[keyof typeof AREA];
export type Grupo = (typeof GRUPO)[keyof typeof GRUPO];
export type TipoAprobacion =
  (typeof TIPO_APROBACION)[keyof typeof TIPO_APROBACION];

export interface UnidadCurricular {
  codigo: string;
  nombre: string;
  creditos: number;
  area: Area;
  grupo: Grupo;
}

export interface UnidadCurricularAprobada extends UnidadCurricular {
  tipoAprobacion: TipoAprobacion;
  calificacion?: string;
  fecha?: string;
}

export type InformacionEstudiante = {
  unidadesCurricularesAprobadas: Record<string, UnidadCurricularAprobada>;
  creditosTotales: number;
} & Record<Grupo, number>;
