import { GrupoHijo, GrupoPadre } from "."

export const SEMESTRE_DE_DICTADO = {
	PRIMER_SEMESTRE: "1",
	SEGUNDO_SEMESTRE: "2"
} as const;
export type SemestreDeDictado = (typeof SEMESTRE_DE_DICTADO)[keyof typeof SEMESTRE_DE_DICTADO];

export const TIPO_UC = {
	GRADO: "G",
	POSGRADO: "P",
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
  nombreGrupoPadre: GrupoPadre;
  codigoGrupoPadre: number;
  nombreGrupoHijo: GrupoHijo;
  codigoGrupoHijo: number;
  nombreUC: string;
  codigoUC: number;
  codigoEnServicioUC: string;
	tipoUC: TipoUC;
	creditosUC: number;
	semestres: SemestreDeDictado[] | null;
};

export type UnidadCurricularRelevamientoDeDatosCSV = {
	instituto: string;
	nombre: string;
	codigo: string;
	inscriptos: string;
}

export type UnidadCurricularConGrupoCSV = {
	nombrep: string;
	codigogrupop: string;
	nombreh: string;
	codigogrupoh: string;
	nombre_mat: string;
	codigo_materia: string;
	codenservicio_mat: string;
}

export type UnidadCurricularConGrupo = {
	nombreGrupoPadre: GrupoPadre;
	codigoGrupoPadre: number;
	nombreGrupoHijo: GrupoHijo;
	codigoGrupoHijo: number;
	nombreUC: string;
	codigoUC: number;
	codigoEnServicioUC: string;
}

export type UnidadCurricularFingCSV = {
	codigo_materia: string;
	codenservicio_mat: string;
	nombre_mat: string;
	tipo_mat: string;
	servicio_mat: string;
	abrev_serv_mat: string;
	creditos_mat: string;
	edperm: string;
	codinstituto: string;
	minimo_escala: string;
	maximo_escala: string;
	umbralaprobacion: string;
	fecha_datos: string;
}

export type UnidadCurricularFing = {
	codigoUC: number;
	codigoEnServicioUC: string;
	nombreUC: string;
	tipoUC: TipoUC;
	servicioUC: string;
	abreviaturaServicioUC: string;
	creditosUC: number;
	edperm: string;
	codigoInstituto: string;
	minimoEscala: string;
	maximoEscala: string;
	umbralAprobacion: string;
	fechaDatos: Date;
}