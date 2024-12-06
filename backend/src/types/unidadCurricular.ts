export type UnidadCurricular = {
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
