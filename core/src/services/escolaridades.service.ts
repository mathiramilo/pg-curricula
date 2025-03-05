import axios from 'axios';

import { env } from '../config';
import { InformacionEstudiante } from '../types';

export const procesarEscolaridad = async (file: Express.Multer.File) => {
  const formData = new FormData();
  const fileBlob = new Blob([file.buffer], { type: file.mimetype });
  formData.append('file', fileBlob, file.originalname);

  const url = `${env.PDF_PROCESSOR_SERVICE_URL}/procesar-escolaridad`;

  const response = await axios.post<InformacionEstudiante>(url, formData);

  return response.data;
};
