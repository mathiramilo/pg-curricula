import type { NextFunction, Request, RequestHandler, Response } from 'express';

import { HTTP_STATUS_CODE } from '../constants';
import { procesarEscolaridad } from '../services';

export const procesarEscolaridadController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
      error: 'No se subió ningún archivo',
    });
  }

  try {
    const informacionEstudiante = await procesarEscolaridad(req.file);

    res.status(HTTP_STATUS_CODE.OK).json(informacionEstudiante);
  } catch (error: unknown) {
    next(error);
  }
};
