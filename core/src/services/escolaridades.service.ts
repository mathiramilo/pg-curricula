import axios from 'axios';

import ucsFing from '../../data/ucs-fing.json';

import { env } from '../config';
import { InformacionEstudiante } from '../types';

export const procesarEscolaridad = async (file: Express.Multer.File) => {
  const formData = new FormData();
  const fileBlob = new Blob([file.buffer], { type: file.mimetype });
  formData.append('file', fileBlob, file.originalname);

  const url = `${env.PDF_PROCESSOR_SERVICE_URL}/procesar-escolaridad`;

  const response = await axios.post<InformacionEstudiante>(url, formData);

  const informacionEstudiante = asociarCodigosUCs(response.data);

  return informacionEstudiante;
};

const asociarCodigosUCs = (informacionEstudiante: InformacionEstudiante) => {
  const nombresUCs = Object.keys(
    informacionEstudiante.unidadesCurricularesAprobadas
  );

  const unidadesCurricularesAprobadasActualizado = {};

  for (const nombreUC of nombresUCs) {
    const ucs = ucsFing.filter((uc) => uc.nombreUC === nombreUC);

    // Buscamos una UC que tenga la misma cantidad de creditos
    const uc1 = ucs.find(
      (uc) =>
        uc.creditosUC ===
        informacionEstudiante.unidadesCurricularesAprobadas[nombreUC]
          ?.creditosUC
    );

    // Buscamos una UC que tenga la misma cantidad de creditos y se dicte actualmente
    const uc2 = ucs.find(
      (uc) =>
        uc.creditosUC ===
          informacionEstudiante.unidadesCurricularesAprobadas[nombreUC]
            ?.creditosUC && uc.semestres
    );

    // Si encontramos una UC que cumpla con las ultimas condiciones, la asociamos, sino, asociamos la primera que encontramos
    if (uc2) {
      unidadesCurricularesAprobadasActualizado[uc2.codigoEnServicioUC] =
        informacionEstudiante.unidadesCurricularesAprobadas[nombreUC];
    } else if (uc1) {
      unidadesCurricularesAprobadasActualizado[uc1.codigoEnServicioUC] =
        informacionEstudiante.unidadesCurricularesAprobadas[nombreUC];
    }
  }

  return {
    ...informacionEstudiante,
    unidadesCurricularesAprobadas: unidadesCurricularesAprobadasActualizado,
  };
};
