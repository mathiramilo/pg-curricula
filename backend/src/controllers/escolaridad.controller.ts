import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { unlink } from 'fs/promises';

import { ErrorResponse, ExtendedError, InformacionEstudiante } from '../types';

import { CodigoHTTP } from '../constants';
import { procesarPDF } from '../lib';

export const procesarEscolaridadController: RequestHandler = async (
  req: Request,
  res: Response<InformacionEstudiante | ErrorResponse>,
  next: NextFunction
) => {
  if (!req.file) {
    return res.status(CodigoHTTP.BAD_REQUEST).json({
      error: 'No se subió ningún archivo'
    });
  }

  try {
    // Usar ubicacionArchivo donde se guardo el archivo
    const ubicacionArchivo = req.file.path;

    // Llamar a la función procesarPDF
    const archivo = await procesarPDF(ubicacionArchivo) as InformacionEstudiante;
 
    // Eliminar el archivo temporal una vez procesado
    await unlink(ubicacionArchivo);

    res.status(CodigoHTTP.OK).json(archivo);
  } catch (error: unknown) {
    // Eliminar el archivo temporal una vez procesado en caso de fallo
    if (error instanceof ExtendedError) await unlink(error.details)
    next(error);
  }
};
