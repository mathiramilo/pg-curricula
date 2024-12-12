import { Area } from "./informacionEstudiante"

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
  nombreGrupoPadre: Area;
  codigoGrupoPadre: number;
  nombreGrupoHijo: string;
  codigoGrupoHijo: number;
  nombreUC: string;
  codigoUC: number;
  codigoEnServicioUC: string;
	tipoUC: string;
	creditosUC: number;
};

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
	nombreGrupoPadre: Area;
	codigoGrupoPadre: number;
	nombreGrupoHijo: string;
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
	tipoUC: string;
	servicioUC: string;
	abreviaturaServicioUC: string;
	creditosUC: number;
	edperm: string;
	codigoInstituto: string;
	minimoEscala: string;
	maximoEscala: string;
	umbralAprobacion: string;
	fechaDatos: string;
}