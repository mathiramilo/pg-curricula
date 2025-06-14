import { NextFunction, Request, RequestHandler, Response } from 'express';

import previaturas from '../../data/previaturas.json';

import { HTTP_STATUS_CODE } from '../constants';
import { cumplePreviaturas } from '../services';
import { type InformacionEstudiante } from '../types';

export const obtenerPreviaturasController: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { codigo } = req.params;

  try {
    if (!codigo)
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        error: 'No se proporcionó el código de la unidad curricular a chequear',
      });

    if (!previaturas[codigo])
      return res.status(HTTP_STATUS_CODE.NO_CONTENT).json(null);

    return res.status(HTTP_STATUS_CODE.OK).json(previaturas[codigo]);
  } catch (error) {
    next(error);
  }
};

export const satisfacePreviaturasController: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { codigo } = req.params;
  const informacionEstudiante = req.body;

  try {
    if (!codigo)
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        error: 'No se proporcionó el código de la unidad curricular a chequear',
      });

    if (!previaturas[codigo]) return res.status(HTTP_STATUS_CODE.OK).json(true);

    const cumple = cumplePreviaturas(
      informacionEstudiante as InformacionEstudiante,
      previaturas[codigo]
    );
    return res.status(HTTP_STATUS_CODE.OK).json(cumple);
  } catch (error) {
    next(error);
  }
};
