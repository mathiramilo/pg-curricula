import { exec } from 'child_process';
import { Request, Response } from 'express';

import previaturas from '../../data/previaturas.json';
import cumplePrevias from '../lib/cumplePrevias';
import { obtenerComandoScriptPython } from '../lib/helpers';

const UBICACION_ARCHIVO = 'uploads/esc-ri.pdf';

export const chequearPrevias = (req: Request, res: Response): void => {
  const { uc } = req.params;

  exec(
    obtenerComandoScriptPython(UBICACION_ARCHIVO, true),
    (error, stdout, stderr) => {
      if (error) return res.status(500).json({ error });
      if (stderr) return res.status(500).json({ error: stderr });

      const informacionEstudiante = JSON.parse(stdout);
      const cumple = cumplePrevias(informacionEstudiante, previaturas[uc]);
      return res.status(200).json({ habilitado: cumple });
    }
  );
};
