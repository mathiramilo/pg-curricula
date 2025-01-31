export type UnidadCurricularConSemestre = {
  codigo: string;
  nombre: string;
  semestre?: number;
};

export type TrayectoriaSugerida = {
  semestre: number;
  asignaturas: string[];
};
