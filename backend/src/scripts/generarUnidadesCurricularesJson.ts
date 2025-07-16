import fs from "fs";
import axios from "axios";

import ucsPrimerSemestre from "../../data/ucs-primer-semestre.json";
import ucsSegundoSemestre from "../../data/ucs-segundo-semestre.json";
import { env } from "../config";
import {
  SEMESTRE_DE_DICTADO,
  SemestreDeDictado,
  UnidadCurricular,
  UnidadCurricularResponse,
} from "../types";

const UBICACION_DESTINO = "../../data/unidades-curriculares.json";

const generarUnidadesCurricularesJson = async (): Promise<void> => {
  try {
    const unidadesCurriculares = await obtenerUnidadesCurriculares();

    fs.writeFileSync(
      UBICACION_DESTINO,
      JSON.stringify(unidadesCurriculares, null, 4),
      "utf8",
    );

    console.log(
      `Archivo JSON de unidades curriculares generado correctamente en ${UBICACION_DESTINO}`,
    );
  } catch (error) {
    console.error(error);
  }
};

const obtenerUnidadesCurriculares = async (): Promise<UnidadCurricular[]> => {
  const url = `${env.PDF_PROCESSOR_SERVICE_URL}/unidades-curriculares`;

  const { data } = await axios.get<UnidadCurricularResponse[]>(url);

  if (!data) {
    throw new Error(
      "Ha ocurrido un error al fetchear las unidades curriculares",
    );
  }

  const unidadesCurriculares: UnidadCurricular[] = [];

  for (const unidadCurricular of data) {
    const semestres: SemestreDeDictado[] = [];
    if (ucsPrimerSemestre.find((uc) => uc.codigo === unidadCurricular.codigo)) {
      semestres.push(SEMESTRE_DE_DICTADO.PRIMER_SEMESTRE);
    }
    if (
      ucsSegundoSemestre.find((uc) => uc.codigo === unidadCurricular.codigo)
    ) {
      semestres.push(SEMESTRE_DE_DICTADO.SEGUNDO_SEMESTRE);
    }

    const uc: UnidadCurricular = {
      nombre: unidadCurricular.nombre,
      codigo: unidadCurricular.codigo,
      creditos: +unidadCurricular.creditos,
      nombreGrupoPadre: unidadCurricular.nombre_grupo_padre,
      codigoGrupoPadre: unidadCurricular.codigo_grupo_padre,
      nombreGrupoHijo: unidadCurricular.nombre_grupo_hijo,
      codigoGrupoHijo: unidadCurricular.codigo_grupo_hijo,
      semestres: semestres.length > 0 ? semestres : null,
    };

    unidadesCurriculares.push(uc);
  }

  return unidadesCurriculares;
};

generarUnidadesCurricularesJson();
