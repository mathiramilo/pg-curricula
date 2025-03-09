import { NextFunction, Request, RequestHandler, Response } from 'express';

import previaturas from '../../data/previaturas.json';
import { CodigoHTTP } from '../constants';
import { cumplePrevias } from '../services';
import {
  ErrorResponse,
  esInformacionEstudiante,
  type InformacionEstudiante,
} from '../types';

export const chequearPreviasController: RequestHandler = (
  req: Request,
  res: Response<boolean | ErrorResponse>,
  next: NextFunction
) => {
  const { codigoEnServicioUC } = req.params;
  const informacionEstudiante = req.body;

  try {
    if (!codigoEnServicioUC)
      return res.status(CodigoHTTP.BAD_REQUEST).json({
        error: 'No se proporcionó el código de la UC a chequear',
      });

    if (!previaturas[codigoEnServicioUC])
      return res.status(CodigoHTTP.NOT_FOUND).json({
        error: `No se encontró ninguna UC con código ${codigoEnServicioUC}`,
      });

    if (!esInformacionEstudiante(informacionEstudiante))
      return res.status(CodigoHTTP.BAD_REQUEST).json({
        error:
          'La información del estudiante no cumple con el formato esperado. Verifica que estén todos los campos necesarios y que tengan el tipo de dato correcto',
      });

    //? Si la UC ya fue aprobada por el estudiante, no es necesario verificar las previas. En este caso deberiamos devolver true (indicando que el estudiante esta habilitado para cursarla) o false (indicando que no la puede hacer denuevo debido a que ya la curso)?
    if (
      informacionEstudiante.unidadesCurricularesAprobadas.hasOwnProperty(
        codigoEnServicioUC
      )
    )
      return res.status(CodigoHTTP.OK).json(false);

    const cumple = cumplePrevias(
      informacionEstudiante as InformacionEstudiante,
      previaturas[codigoEnServicioUC]
    );
    return res.status(CodigoHTTP.OK).json(cumple);
  } catch (error) {
    next(error);
  }
};
