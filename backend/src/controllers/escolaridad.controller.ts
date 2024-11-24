import type { NextFunction, Request, RequestHandler, Response } from 'express';
import fs from 'fs';

import { CodigoHTTP, respuestaFallida } from '../constants';
import { procesarPDF } from '../lib';

export const procesarEscolaridadController: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return res
      .status(CodigoHTTP.BAD_REQUEST)
      .json(
        respuestaFallida('No se subió ningún archivo', CodigoHTTP.BAD_REQUEST)
      );
  }

  try {
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
  } catch (error) {
    next(error);
  }
};
