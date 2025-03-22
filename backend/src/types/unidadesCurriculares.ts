import { GrupoHijo, GrupoPadre } from '.';

export const SEMESTRE_DE_DICTADO = {
  PRIMER_SEMESTRE: '1',
  SEGUNDO_SEMESTRE: '2',
} as const;
export type SemestreDeDictado =
  (typeof SEMESTRE_DE_DICTADO)[keyof typeof SEMESTRE_DE_DICTADO];

export const TIPO_UC = {
  GRADO: 'G',
  POSGRADO: 'P',
} as const;
export type TipoUC = (typeof TIPO_UC)[keyof typeof TIPO_UC];

export type UnidadCurricularCSV = {
  nombrep: string;
  codigogrupop: string;
  nombreh: string;
  codigogrupoh: string;
  nombre_mat: string;
  codigo_materia: string;
  codenservicio_mat: string;
  tipo_mat: string;
  creditos_mat: string;
};

export type UnidadCurricular = {
  codigoEnServicioUC: string;
  nombreUC: string;
  codigoUC: number;
  tipoUC: TipoUC;
  creditosUC: number;
  nombreGrupoPadre: GrupoPadre;
  codigoGrupoPadre: number;
  nombreGrupoHijo: GrupoHijo;
  codigoGrupoHijo: number;
  semestres: SemestreDeDictado[] | null;
};

export type UnidadCurricularRelevamientoDeDatosCSV = {
  instituto: string;
  nombre: string;
  codigo: string;
  inscriptos: string;
};
