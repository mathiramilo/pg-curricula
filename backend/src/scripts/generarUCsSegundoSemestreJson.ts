import fs from "fs";
import axios from "axios";

import { env } from "../config";
import { ReglaPreviaturas } from "../types";

const UBICACION_DESTINO = "../../data/ucs-segundo-semestre.json";

const generarUCsSegundoSemestreJson = async () => {
  try {
    const url = `${env.PDF_PROCESSOR_SERVICE_URL}/unidades-curriculares/segundo-semestre`;
    const { data: ucsSegundoSemestre } =
      await axios.get<Record<string, ReglaPreviaturas>>(url);

    if (!ucsSegundoSemestre) {
      throw new Error(
        "Ha ocurrido un error al fetchear las unidades curriculares del segundo semestre",
      );
    }

    fs.writeFileSync(
      UBICACION_DESTINO,
      JSON.stringify(ucsSegundoSemestre, null, 4),
      "utf8",
    );

    console.log(
      `Archivo JSON de unidades curriculares del segundo semestre generado correctamente en ${UBICACION_DESTINO}`,
    );
  } catch (error) {
    console.error(
      "Error al generar el JSON de unidades curriculares del segundo semestre:",
      error,
    );
  }
};

generarUCsSegundoSemestreJson();
