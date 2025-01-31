import { NextFunction, Request, RequestHandler, Response } from 'express';

import previaturas from '../../data/previaturas.json';
import { CodigoHTTP } from '../constants';
import { cumplePrevias } from '../lib';
import {
  ErrorResponse,
  esInformacionEstudiante,
  type InformacionEstudiante
} from '../types';

export const chequearPreviasController: RequestHandler = (
  req: Request,
  res: Response<boolean | ErrorResponse>,
  next: NextFunction
) => {
  const { nombreUC } = req.params;
  const informacionEstudiante = req.body;

  try {
    if (!nombreUC)
      return res.status(CodigoHTTP.BAD_REQUEST).json({
        error: 'No se proporcionó el nombre de la UC a chequear'
      });

    if (!previaturas[nombreUC])
      return res.status(CodigoHTTP.NOT_FOUND).json({
        error: `No se encontró ninguna UC con nombre ${nombreUC}`
      });

    if (!esInformacionEstudiante(informacionEstudiante))
      return res.status(CodigoHTTP.BAD_REQUEST).json({
        error:
          'La información del estudiante no cumple con el formato esperado. Verifica que estén todos los campos necesarios y que tengan el tipo de dato correcto'
      });

    //? Si la UC ya fue aprobada por el estudiante, no es necesario verificar las previas. En este caso deberiamos devolver true (indicando que el estudiante esta habilitado para cursarla) o false (indicando que no la puede hacer denuevo debido a que ya la curso)?
    if (informacionEstudiante['UCs Aprobadas'].hasOwnProperty(nombreUC))
      return res
        .status(CodigoHTTP.OK)
        .json(false);

    const cumple = cumplePrevias(
      informacionEstudiante as InformacionEstudiante,
      previaturas[nombreUC]
    );
    return res
      .status(CodigoHTTP.OK)
      .json(cumple);
  } catch (error) {
    next(error);
  }
};
