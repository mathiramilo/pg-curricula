import { GrupoHijo, GrupoPadre } from ".";

export const SEMESTRE_DE_DICTADO = {
  PRIMER_SEMESTRE: "1",
  SEGUNDO_SEMESTRE: "2",
} as const;
export type SemestreDeDictado =
  (typeof SEMESTRE_DE_DICTADO)[keyof typeof SEMESTRE_DE_DICTADO];

export type UnidadCurricular = {
  codigo: string;
  nombre: string;
  creditos: number;
  codigoGrupoPadre: string;
  nombreGrupoPadre: GrupoPadre;
  codigoGrupoHijo: string;
  nombreGrupoHijo: GrupoHijo;
  semestres: SemestreDeDictado[] | null;
};

export type UnidadCurricularResponse = {
  codigo: string;
  nombre: string;
  creditos: number;
  codigo_grupo_padre: string;
  nombre_grupo_padre: GrupoPadre;
  codigo_grupo_hijo: string;
  nombre_grupo_hijo: GrupoHijo;
};
