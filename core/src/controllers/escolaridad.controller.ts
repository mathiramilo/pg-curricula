import type { NextFunction, Request, RequestHandler, Response } from 'express';

import { CodigoHTTP } from '../constants';
import { ErrorResponse, InformacionEstudiante } from '../types';
import { procesarEscolaridad } from '../lib'

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
    const informacionEstudiante = await procesarEscolaridad(req.file);

    res.status(CodigoHTTP.OK).json(informacionEstudiante);
  } catch (error: unknown) {
    next(error);
  }
};
