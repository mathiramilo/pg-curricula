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

    const uc = ucs.find(
      (uc) =>
        uc.creditosUC ===
        informacionEstudiante.unidadesCurricularesAprobadas[nombreUC]?.creditos
    );

    if (uc) {
      unidadesCurricularesAprobadasActualizado[uc.codigoEnServicioUC] =
        informacionEstudiante.unidadesCurricularesAprobadas[nombreUC];
    }
  }

  return {
    ...informacionEstudiante,
    unidadesCurricularesAprobadas: unidadesCurricularesAprobadasActualizado,
  };
};
