import { NextFunction, Request, RequestHandler, Response } from 'express';

import previaturas from '../../data/previaturas.json';

import { HTTP_STATUS_CODE } from '../constants';
import { cumplePrevias } from '../services';
import { type InformacionEstudiante } from '../types';

export const satisfacePreviasController: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { codigoEnServicioUC } = req.params;
  const informacionEstudiante = req.body;

  try {
    if (!codigoEnServicioUC)
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        error: 'No se proporcionó el código de la unidad curricular a chequear',
      });

    if (!previaturas[codigoEnServicioUC])
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
        error: `No se encontró ninguna unidad curricular con código ${codigoEnServicioUC}`,
      });

    //? Si la UC ya fue aprobada por el estudiante, no es necesario verificar las previas. En este caso deberiamos devolver true (indicando que el estudiante esta habilitado para cursarla) o false (indicando que no la puede hacer denuevo debido a que ya la curso)?
    if (
      informacionEstudiante.unidadesCurricularesAprobadas?.hasOwnProperty(
        codigoEnServicioUC
      )
    ) {
      return res.status(HTTP_STATUS_CODE.OK).json(false);
    }

    const cumple = cumplePrevias(
      informacionEstudiante as InformacionEstudiante,
      previaturas[codigoEnServicioUC]
    );
    return res.status(HTTP_STATUS_CODE.OK).json(cumple);
  } catch (error) {
    next(error);
  }
};
