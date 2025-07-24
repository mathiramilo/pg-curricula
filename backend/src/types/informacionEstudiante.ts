import { UnidadCurricular } from ".";

export type InformacionEstudiante = {
  unidadesCurricularesAprobadas: Record<UnidadCurricular["codigo"], UCAprobada>;
  creditosTotales: number;
  modulosTaller: number;
  modulosExtension: number;
  MATEMATICA: number;
  "CIENCIAS EXPERIMENTALES": number;
  PROGRAMACION: number;
  "ARQUIT, S.OP. Y REDES DE COMP.": number;
  "INT.ARTIFICIAL Y ROBOTICA": number;
  "B.DATOS Y SIST. DE INFORMACION": number;
  "CALCULO NUMERICO Y SIMBOLICO": number;
  "INVESTIGACION OPERATIVA": number;
  "INGENIERIA DE SOFTWARE": number;
  "A.INTEG,TALLERES,PASANT.Y PROY": number;
  "GESTION EN ORGANIZACIONES": number;
  "CIENCIAS HUMANAS Y SOCIALES": number;
  "MATERIAS OPCIONALES": number;
};

export const TIPO_APROBACION = {
  EXAMEN: "Examen",
  CURSO: "Curso",
} as const;
type TipoAprobacion = (typeof TIPO_APROBACION)[keyof typeof TIPO_APROBACION];

export type UCAprobada = Pick<
  UnidadCurricular,
  "codigo" | "creditos" | "nombre" | "nombreGrupoPadre" | "nombreGrupoHijo"
> & {
  tipoAprobacion: TipoAprobacion;
  concepto?: string | null;
  fecha?: string;
};
