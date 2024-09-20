import { NextFunction, Request, RequestHandler, Response } from 'express';

import previaturas from '../../data/previaturas.json';
import { CodigoHTTP, respuestaExitosa, respuestaFallida } from '../constants';
import { cumplePrevias } from '../lib';
import { esInformacionEstudiante, type InformacionEstudiante } from '../types';

export const chequearPrevias: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nombreUC } = req.params;
  const informacionEstudiante = req.body;

  try {
    if (!nombreUC)
      return res
        .status(CodigoHTTP.BAD_REQUEST)
        .json(
          respuestaFallida(
            'No se proporcionó el nombre de la UC a chequear',
            CodigoHTTP.BAD_REQUEST
          )
        );

    if (!previaturas[nombreUC])
      return res
        .status(CodigoHTTP.NOT_FOUND)
        .json(
          respuestaFallida(
            `No se encontró ninguna UC con nombre ${nombreUC}`,
            CodigoHTTP.NOT_FOUND
          )
        );

    if (!esInformacionEstudiante(informacionEstudiante))
      return res
        .status(CodigoHTTP.BAD_REQUEST)
        .json(
          respuestaFallida(
            'La información del estudiante no cumple con el formato esperado. Verifica que estén todos los campos necesarios y que tengan el tipo de dato correcto',
            CodigoHTTP.BAD_REQUEST
          )
        );

    //? Si la UC ya fue aprobada por el estudiante, no es necesario verificar las previas. En este caso deberiamos devolver true (indicando que el estudiante esta habilitado para cursarla) o false (indicando que no la puede hacer denuevo debido a que ya la curso)?
    if (informacionEstudiante['UCs Aprobadas'].hasOwnProperty(nombreUC))
      return res
        .status(CodigoHTTP.OK)
        .json(respuestaExitosa<boolean>(false, CodigoHTTP.OK));

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
