import fs from "fs";
import axios from "axios";

import { env } from "../config";
import { ReglaPreviaturas } from "../types";

const UBICACION_DESTINO = "../../data/ucs-primer-semestre.json";

const generarUCsPrimerSemestreJson = async () => {
  try {
    const url = `${env.PDF_PROCESSOR_SERVICE_URL}/unidades-curriculares/primer-semestre`;
    const { data: ucsPrimerSemestre } =
      await axios.get<Record<string, ReglaPreviaturas>>(url);

    if (!ucsPrimerSemestre) {
      throw new Error(
        "Ha ocurrido un error al fetchear las unidades curriculares del primer semestre",
      );
    }

    fs.writeFileSync(
      UBICACION_DESTINO,
      JSON.stringify(ucsPrimerSemestre, null, 4),
      "utf8",
    );

    console.log(
      `Archivo JSON de unidades curriculares del primer semestre generado correctamente en ${UBICACION_DESTINO}`,
    );
  } catch (error) {
    console.error(
      "Error al generar el JSON de unidades curriculares del primer semestre:",
      error,
    );
  }
};

generarUCsPrimerSemestreJson();
