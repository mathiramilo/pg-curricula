import { NextFunction, Request, RequestHandler, Response } from 'express';

import informacionEstudiante from '../../data/informacion-estudiante.json';
import previaturas from '../../data/previaturas.json';
import { respuestaExitosa, respuestaFallida } from '../constants/respuestas';
import { CodigoHTTP } from '../constants/http';
import cumplePrevias from '../lib/cumplePrevias';
import type { InformacionEstudiante } from '../types/informacionEstudiante';

export const chequearPrevias: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nombreUC } = req.params;

  try {
    if (!previaturas[nombreUC])
      return res
        .status(CodigoHTTP.NOT_FOUND)
        .json(
          respuestaFallida(
            `No se encontró ninguna UC con nombre ${nombreUC}`,
            CodigoHTTP.NOT_FOUND
          )
        );

    const cumple = cumplePrevias(
      informacionEstudiante as InformacionEstudiante,
      previaturas[nombreUC]
    );
    return res
      .status(CodigoHTTP.OK)
      .json(respuestaExitosa<boolean>(cumple, CodigoHTTP.OK));
  } catch (error) {
    next(error);
  }
};
