import { exec } from 'child_process';
import { Response } from 'express';

import { CodigoHTTP, respuestaExitosa, respuestaFallida } from '../constants';
import { type InformacionEstudiante } from '../types';
import { obtenerComandoScriptPython } from './helpers';

export const procesarPDF = (
  ubicacionArchivo: string,
  res: Response,
  callback: () => void
): void => {
  const scriptCmd = obtenerComandoScriptPython(ubicacionArchivo);

  exec(scriptCmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res
        .status(CodigoHTTP.INTERNAL_SERVER_ERROR)
        .json(
          respuestaFallida(
            'Error en la ejecución del script',
            CodigoHTTP.INTERNAL_SERVER_ERROR
          )
        );
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res
        .status(CodigoHTTP.INTERNAL_SERVER_ERROR)
        .json(
          respuestaFallida(
            'Error en el script',
            CodigoHTTP.INTERNAL_SERVER_ERROR
          )
        );
    }

    // console.log('Output del script:', stdout);

    // Si todo fue bien, solo devolver éxito
    res
      .status(CodigoHTTP.OK)
      .json(
        respuestaExitosa<InformacionEstudiante>(
          JSON.parse(stdout),
          CodigoHTTP.OK
        )
      );

    // Llama al callback para eliminar el archivo
    callback();
  });
};
