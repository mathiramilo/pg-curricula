import type { NextFunction, Request, RequestHandler, Response } from 'express';

import { ErrorResponse } from '../types';
import { CodigoHTTP } from '../constants';
import {
  obtenerTrayectoriaSugerida,
  obtenerUnidadesCurriculares,
} from '../services';

export const obtenerUnidadesCurricularesController: RequestHandler = async (
  _req: Request,
  res: Response
) => {
  try {
    const unidadesCurriculares = await obtenerUnidadesCurriculares();
    res.status(CodigoHTTP.OK).json(unidadesCurriculares);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      error: 'Error al cargar las unidades curriculares',
      details: error instanceof Error ? error.message : 'Error desconocido',
    };
    res.status(CodigoHTTP.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
};

export const obtenerTrayectoriaSugeridaController: RequestHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const trayectoriaSugerida = await obtenerTrayectoriaSugerida();
    res.status(CodigoHTTP.OK).json(trayectoriaSugerida);
  } catch (error) {
    next(error);
  }
};
