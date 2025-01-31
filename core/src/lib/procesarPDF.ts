import { exec } from 'child_process';
import { promisify } from 'util';

import { obtenerComandoScriptPython } from './helpers';
import { ExtendedError, InformacionEstudiante } from '../types';

const execAsync = promisify(exec);

export const procesarPDF = async (ubicacionArchivo: string): Promise<InformacionEstudiante | Error> => {
  const scriptCmd = obtenerComandoScriptPython(ubicacionArchivo);

  try {
    const { stdout, stderr } = await execAsync(scriptCmd);

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      throw new ExtendedError('Error en el script', ubicacionArchivo);
    }

    return JSON.parse(stdout) as InformacionEstudiante;
  } catch (error) {
    console.error(`Error ejecutando el script: ${error}`);
    throw new ExtendedError('Error en la ejecución del script', ubicacionArchivo);
  }
};
