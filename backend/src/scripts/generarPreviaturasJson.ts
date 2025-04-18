import axios from 'axios';
import fs from 'fs';

import { env } from '../config';
import { ReglaPreviaturas } from '../types';

const UBICACION_DESTINO = '../../data/previaturas.json';

const generarPreviaturasJson = async () => {
  try {
    const url = `${env.PDF_PROCESSOR_SERVICE_URL}/previaturas`;
    const { data: previaturas } =
      await axios.get<Record<string, ReglaPreviaturas>>(url);

    if (!previaturas) {
      throw new Error('Ha ocurrido un error al fetchear las previaturas');
    }

    fs.writeFileSync(
      UBICACION_DESTINO,
      JSON.stringify(previaturas, null, 4),
      'utf8'
    );
  } catch (error) {
    console.error('Error al generar el JSON de previaturas:', error);
  }
};

generarPreviaturasJson();
