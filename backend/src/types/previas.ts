export type PreviaCSV = {
  cod_materia: string;
  codenservicio_mat: string;
  nombre_mat: string;
  tipo_descriptor: string;
  cod_condicion: string;
  cod_condicion_padre: string;
  tipo: string;
  cantmaterias: string;
  cod_plan: string;
  cantcreditos: string;
  cod_grupo: string;
  nombre_grupo: string;
  cod_elemento: string;
  tipo_instancia: string;
  'nombre_mat-2': string;
  'codenservicio_mat-2': string;
};

export type Previa = {
  codigoUC: number;
  codigoEnServicioUC: string;
  nombreUC: string;
  codigoCondicion: number;
  codigoCondicionPadre: number | null;
  tipo: TipoPrevia;
  cantidad: number | null;
  codigoPlan: number | null;
  cantidadCreditos: number | null;
  codigoGrupo: number | null;
  nombreGrupo: string | null;
  codigoElemento: number | null;
  tipoInstancia: TipoInstancia | null;
  nombrePrevia: string | null;
  codigoEnServicioPrevia: string | null;
};

export const TipoInstancia = {
  C: 'C',
  E: 'E'
} as const;
export type TipoInstancia = (typeof TipoInstancia)[keyof typeof TipoInstancia];

export const TipoPrevia = {
  AND: 'AND',
  OR: 'OR',
  NOT: 'NOT',
  B: 'B',
  M: 'M',
  N: 'N',
  D: 'D',
  R: 'R'
} as const;
export type TipoPrevia = (typeof TipoPrevia)[keyof typeof TipoPrevia];
