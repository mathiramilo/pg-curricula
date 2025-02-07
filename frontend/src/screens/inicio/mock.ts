import { AREA, GRUPO } from "@/models";
import type { UnidadCurricular } from "@/models";

export const unidadesCurriculares: UnidadCurricular[] = [
  {
    codigo: "1061",
    nombre: "Calculo DIV",
    creditos: 12,
    area: AREA.BASICO_TEC_TECNICAS_E_INTEG,
    grupo: GRUPO.MATEMATICA,
  },
  {
    codigo: "1063",
    nombre: "Calculo DIVV",
    creditos: 10,
    area: AREA.BASICO_TEC_TECNICAS_E_INTEG,
    grupo: GRUPO.MATEMATICA,
  },
  {
    codigo: "1020",
    nombre: "GAL 1",
    creditos: 10,
    area: AREA.BASICO_TEC_TECNICAS_E_INTEG,
    grupo: GRUPO.MATEMATICA,
  },
  {
    codigo: "1028",
    nombre: "GAL 2",
    creditos: 12,
    area: AREA.BASICO_TEC_TECNICAS_E_INTEG,
    grupo: GRUPO.MATEMATICA,
  },
  {
    codigo: "1130",
    nombre: "Fisica 1",
    creditos: 10,
    area: AREA.BASICO_TEC_TECNICAS_E_INTEG,
    grupo: GRUPO.MATERIAS_OPCIONALES,
  },
  {
    codigo: "1278",
    nombre: "Programacion 1",
    creditos: 12,
    area: AREA.BASICO_TEC_TECNICAS_E_INTEG,
    grupo: GRUPO.PROGRAMACION,
  },
];
