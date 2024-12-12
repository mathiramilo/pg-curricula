export type UnidadCurricularConSemestre = {
  codigo: string;
  nombre: string;
  semestre?: number;
};

export type TrayectoriaRegular = {
  semestre: number;
  asignaturas: {
    nombre: string;
  }[];
};
