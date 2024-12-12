import { GrupoHijo, GrupoPadre } from "."

export type InformacionEstudiante = {
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
};

export type UCAprobada = {
  calificacion: string | null;
  fecha: string;
  creditos: number | null;
  nombre: string;
  tipoAprobacion: TipoAprobacion;
  area: GrupoPadre;
  grupo: GrupoHijo;
};

export const TIPO_APROBACION = {
  EXAMEN: 'Examen',
  CURSO: 'Curso'
} as const;
export type TipoAprobacion =
  (typeof TIPO_APROBACION)[keyof typeof TIPO_APROBACION];

export const esInformacionEstudiante = (
  obj: unknown
): obj is InformacionEstudiante => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj['UCs Aprobadas'] === 'object' &&
    typeof obj['Creditos Totales'] === 'number' &&
    typeof obj['MATEMATICA'] === 'number' &&
    typeof obj['CIENCIAS EXPERIMENTALES'] === 'number' &&
    typeof obj['PROGRAMACION'] === 'number' &&
    typeof obj['ARQUIT, S.OP. Y REDES DE COMP.'] === 'number' &&
    typeof obj['INT.ARTIFICIAL Y ROBOTICA'] === 'number' &&
    typeof obj['B.DATOS Y SIST. DE INFORMACION'] === 'number' &&
    typeof obj['CALCULO NUMERICO Y SIMBOLICO'] === 'number' &&
    typeof obj['INVESTIGACION OPERATIVA'] === 'number' &&
    typeof obj['INGENIERIA DE SOFTWARE'] === 'number' &&
    typeof obj['A.INTEG,TALLERES,PASANT.Y PROY'] === 'number' &&
    typeof obj['GESTION EN ORGANIZACIONES'] === 'number' &&
    typeof obj['CIENCIAS HUMANAS Y SOCIALES'] === 'number' &&
    typeof obj['MATERIAS OPCIONALES'] === 'number'
  );
};
