import type { NextFunction, Request, RequestHandler, Response } from 'express';

import { HTTP_STATUS_CODE } from '../constants';
import {
  obtenerTrayectoriaSugerida,
  obtenerUnidadesCurriculares,
} from '../services';

export const obtenerUnidadesCurricularesController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { informacionEstudiante } = req.body;
  const filter = { ...req.query };

  if (!informacionEstudiante) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
      error: 'No se proporcionó la información del estudiante',
    });
  }

  try {
    const unidadesCurriculares = await obtenerUnidadesCurriculares(
      informacionEstudiante,
      filter
    );
    res.status(HTTP_STATUS_CODE.OK).json(unidadesCurriculares);
  } catch (error) {
    next(error);
  }
};

export const obtenerTrayectoriaSugeridaController: RequestHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const trayectoriaSugerida = await obtenerTrayectoriaSugerida();
    res.status(HTTP_STATUS_CODE.OK).json(trayectoriaSugerida);
  } catch (error) {
    next(error);
  }
};
