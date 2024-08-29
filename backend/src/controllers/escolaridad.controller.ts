import { Request, Response } from 'express';
import fs from 'fs';

import { procesarPDF } from '../lib/procesarPDF';

export const procesarEscolaridad = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió ningún archivo' });
  }

  // Usar ubicacionArchivo donde se guardo el archivo
  const ubicacionArchivo = req.file.path;
  // Llamar a la función procesarPDF con un callback para eliminar el archivo
  procesarPDF(ubicacionArchivo, res, () => {
    fs.unlink(ubicacionArchivo, err => {
      if (err) {
        console.error(`Error al eliminar el archivo temporal: ${err}`);
      }
    });
  });
};
