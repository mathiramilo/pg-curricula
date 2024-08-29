import { exec } from 'child_process';
import { Response } from 'express';

import { obtenerComandoScriptPython } from './helpers';

export const procesarPDF = (
  ubicacionArchivo: string,
  res: Response,
  callback: () => void
): void => {
  exec(
    obtenerComandoScriptPython(ubicacionArchivo, true),
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res
          .status(500)
          .json({ error: 'Error en la ejecución del script' });
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return res
          .status(500)
          .json({ error: 'Error en la ejecución del script' });
      }

      // console.log('Output del script:', stdout);

      // Si todo fue bien, solo devolver éxito
      res.status(200).send({ data: JSON.parse(stdout) });

      // Llama al callback para eliminar el archivo
      callback();
    }
  );
};
