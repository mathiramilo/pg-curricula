export const AREA = {
  BASICO_TEC_TECNICAS_E_INTEG: "Basico-Tec,Tecnicas e Integ.",
  MATERIAS_BASICAS: "Materias Basicas",
  MATERIAS_COMPLEMENTARIAS: "Materias Complementarias",
  MATERIAS_OPCIONALES: "Materias Opcionales",
} as const;
export const AREA_VALUES = Object.values(AREA);

export const GRUPO = {
  MATEMATICA: "MATEMATICA",
  CIENCIAS_EXPERIMENTALES: "CIENCIAS EXPERIMENTALES",
  PROGRAMACION: "PROGRAMACION",
  ARQUIT_S_OP_Y_REDES_DE_COMP: "ARQUIT, S.OP. Y REDES DE COMP.",
  INT_ARTIFICIAL_Y_ROBOTICA: "INT.ARTIFICIAL Y ROBOTICA",
  B_DATOS_Y_SIST_DE_INFORMACION: "B.DATOS Y SIST. DE INFORMACION",
  CALCULO_NUMERICO_Y_SIMBOLICO: "CALCULO NUMERICO Y SIMBOLICO",
  INVESTIGACION_OPERATIVA: "INVESTIGACION OPERATIVA",
  INGENIERIA_DE_SOFTWARE: "INGENIERIA DE SOFTWARE",
  A_INTEG_TALLERES_PASANT_Y_PROY: "A.INTEG,TALLERES,PASANT.Y PROY",
  GESTION_EN_ORGANIZACIONES: "GESTION EN ORGANIZACIONES",
  CIENCIAS_HUMANAS_Y_SOCIALES: "CIENCIAS HUMANAS Y SOCIALES",
  MATERIAS_OPCIONALES: "MATERIAS OPCIONALES",
} as const;
export const GRUPO_VALUES = Object.values(GRUPO);

export const TIPO_APROBACION = {
  EXAMEN: "Examen",
  CURSO: "Curso",
} as const;

export const TIPO_INSTANCIA = {
  CURSO: "C",
  EXAMEN: "E",
} as const;

export const TIPO_REGLA = {
  AND: "AND",
  OR: "OR",
  NOT: "NOT",
  SOME: "SOME",
  UC: "UC",
  CREDITOS_GRUPO: "CREDITOS_GRUPO",
  CREDITOS_PLAN: "CREDITOS_PLAN",
} as const;

export const SEMESTRE_DE_DICTADO = {
  PRIMER_SEMESTRE: "1",
  SEGUNDO_SEMESTRE: "2",
} as const;

export const REQUISITOS_TITULO = {
  CREDITOS_TOTALES: 450,
  [GRUPO.MATEMATICA]: 70,
  [GRUPO.CIENCIAS_EXPERIMENTALES]: 10,
  [GRUPO.PROGRAMACION]: 60,
  [GRUPO.ARQUIT_S_OP_Y_REDES_DE_COMP]: 30,
  [GRUPO.INT_ARTIFICIAL_Y_ROBOTICA]: 0,
  [GRUPO.B_DATOS_Y_SIST_DE_INFORMACION]: 10,
  [GRUPO.CALCULO_NUMERICO_Y_SIMBOLICO]: 8,
  [GRUPO.INVESTIGACION_OPERATIVA]: 10,
  [GRUPO.INGENIERIA_DE_SOFTWARE]: 10,
  [GRUPO.A_INTEG_TALLERES_PASANT_Y_PROY]: 45,
  [GRUPO.GESTION_EN_ORGANIZACIONES]: 10,
  [GRUPO.CIENCIAS_HUMANAS_Y_SOCIALES]: 10,
  [GRUPO.MATERIAS_OPCIONALES]: 0,
};

export const CREDITOS_POR_SEMESTRE_OPTIONS = [
  {
    label: "20",
    value: "20",
  },
  {
    label: "25",
    value: "25",
  },
  {
    label: "30",
    value: "30",
  },
  {
    label: "35",
    value: "35",
  },
  {
    label: "40",
    value: "40",
  },
  {
    label: "45",
    value: "45",
  },
  {
    label: "50",
    value: "50",
  },
  {
    label: "55",
    value: "55",
  },
  {
    label: "60",
    value: "60",
  },
  {
    label: "65",
    value: "65",
  },
  {
    label: "70",
    value: "70",
  },
  {
    label: "75",
    value: "75",
  },
  {
    label: "80",
    value: "80",
  },
  {
    label: "85",
    value: "85",
  },
  {
    label: "90",
    value: "90",
  },
  {
    label: "95",
    value: "95",
  },
  {
    label: "100",
    value: "100",
  },
  {
    label: "Sin Limite",
    value: "Infinity",
  },
];
