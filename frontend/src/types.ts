import type { ComponentPropsWithoutRef } from "react";

export type SvgProps = ComponentPropsWithoutRef<"svg">;

export interface UnidadCurricular {
  codigo: string;
  nombre: string;
  cursoAprobado: boolean;
  examenAprobado: boolean;
}

export interface InformacionEstudiante {
  "UCs Aprobadas": Record<string, UCAprobada>;
  "Creditos Totales": number;
  MATEMATICA: number;
  "CIENCIAS EXPERIMENTALES": number;
  PROGRAMACION: number;
  "ARQUIT, S.OP. Y REDES DE COMP.": number;
  "INT.ARTIFICIAL Y ROBOTICA": number;
  "B.DATOS Y SIST. DE INFORMACION": number;
  "CALCULO NUMERICO Y SIMBOLICO": number;
  "INVESTIGACION OPERATIVA": number;
  "INGENIERIA DE SOFTWARE": number;
  "A.INTEG,TALLERES,PASANT.Y PROY": number;
  "GESTION EN ORGANIZACIONES": number;
  "CIENCIAS HUMANAS Y SOCIALES": number;
  "MATERIAS OPCIONALES": number;
}

export interface UCAprobada {
  calificacion: string | null;
  fecha: string;
  creditos: number | null;
  nombre: string;
  tipoAprobacion: TipoAprobacion;
  area: Area;
  grupo: string;
}

export const Area = {
  BasicoTecTecnicasEInteg: "Basico-Tec,Tecnicas e Integ.",
  MateriasBasicas: "Materias Basicas",
  MateriasComplementarias: "Materias Complementarias",
  MateriasOpcionales: "Materias Opcionales",
} as const;
export type Area = (typeof Area)[keyof typeof Area];

export const TipoAprobacion = {
  Examen: "Examen",
  Curso: "Curso",
} as const;
export type TipoAprobacion =
  (typeof TipoAprobacion)[keyof typeof TipoAprobacion];
