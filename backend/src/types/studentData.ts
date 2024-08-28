export interface StudentData {
  'UCs Aprobadas': { [key: string]: UCAprobada };
  'Creditos Totales': number;
  MATEMATICA: number;
  'CIENCIAS EXPERIMENTALES': number;
  PROGRAMACION: number;
  'ARQUIT, S.OP. Y REDES DE COMP.': number;
  'INT.ARTIFICIAL Y ROBOTICA': number;
  'B.DATOS Y SIST. DE INFORMACION': number;
  'CALCULO NUMERICO Y SIMBOLICO': number;
  'INVESTIGACION OPERATIVA': number;
  'INGENIERIA DE SOFTWARE': number;
  'A.INTEG,TALLERES,PASANT.Y PROY': number;
  'GESTION EN ORGANIZACIONES': number;
  'CIENCIAS HUMANAS Y SOCIALES': number;
  'MATERIAS OPCIONALES': number;
}

export interface UCAprobada {
  calification: number | null;
  date: string;
  credits: number | null;
  name: string;
  status: Status;
  area: Area;
  group: string;
}

export enum Area {
  BasicoTecTecnicasEInteg = 'Basico-Tec,Tecnicas e Integ.',
  MateriasBasicas = 'Materias Basicas',
  MateriasComplementarias = 'Materias Complementarias',
  MateriasOpcionales = 'Materias Opcionales'
}

export enum Status {
  Examen = 'Examen',
  Curso = 'Curso'
}
