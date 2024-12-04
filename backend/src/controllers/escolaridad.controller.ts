import type { Request, RequestHandler, Response } from 'express';
import { unlink } from 'fs/promises';

import { ErrorResponse, ExtendedError, InformacionEstudiante } from '../types';

import { CodigoHTTP } from '../constants';
import { procesarPDF } from '../lib';

export const procesarEscolaridadController: RequestHandler = async (
  req: Request,
  res: Response<InformacionEstudiante | ErrorResponse>
) => {
  if (!req.file) {
    return res.status(CodigoHTTP.NOT_FOUND).json({
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

    const errorResponse: ErrorResponse = {
      error: 'Error al procesar el archivo',
      details: error instanceof Error ? error.message : 'Error desconocido'
    };

    res.status(CodigoHTTP.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
};
