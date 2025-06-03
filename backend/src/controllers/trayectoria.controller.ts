import { NextFunction, Request, RequestHandler, Response } from 'express';

import { HTTP_STATUS_CODE } from '../constants';
import { generarPlan } from '../services/trayectorias/generarPlan';

export const generarPlanController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { informacionEstudiante, creditosPorSemestre, semestreInicial } =
    req.body;

  if (!informacionEstudiante || !creditosPorSemestre || !semestreInicial) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
      error: 'Faltan datos necesarios para generar el plan de estudios',
    });
  }

  try {
    const trayectoriaSugerida = await generarPlan(
      informacionEstudiante,
      creditosPorSemestre,
      semestreInicial
    );
    res.status(HTTP_STATUS_CODE.OK).json(trayectoriaSugerida);
  } catch (error) {
    next(error);
  }
};
