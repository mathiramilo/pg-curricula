export type UnidadCurricularCSV = {
  nombrep: string;
  codigogrupop: string;
  nombreh: string;
  codigogrupoh: string;
  nombre_mat: string;
  codigo_materia: string;
  codenservicio_mat: string;
};

export type UnidadCurricular = {
  nombreGrupoPadre: string;
  codigoGrupoPadre: number;
  nombreGrupoHijo: string;
  codigoGrupoHijo: number;
  nombreUC: string;
  codigoUC: number;
  codigoEnServicioUC: string;
};
