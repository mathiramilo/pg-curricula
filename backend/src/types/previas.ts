export const TIPO_INSTANCIA = {
  CURSO: "C",
  EXAMEN: "E",
} as const;
export type TipoInstancia =
  (typeof TIPO_INSTANCIA)[keyof typeof TIPO_INSTANCIA];
