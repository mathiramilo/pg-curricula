import { NextFunction, Request, RequestHandler, Response } from 'express';

import { HTTP_STATUS_CODE } from '../constants';
import { generarPlan } from '../services/trayectorias/generarPlan';

export const generarPlanController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { informacionEstudiante, creditosPorSemestre } = req.body;

  try {
    const trayectoriaSugerida = await generarPlan(
      informacionEstudiante,
      creditosPorSemestre
    );
    res.status(HTTP_STATUS_CODE.OK).json(trayectoriaSugerida);
  } catch (error) {
    next(error);
  }
};
