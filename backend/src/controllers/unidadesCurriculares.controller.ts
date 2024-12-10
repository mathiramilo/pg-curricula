import type { NextFunction, Request, RequestHandler, Response } from 'express';

import { ErrorResponse, TrayectoriaRegular, UnidadCurricular } from '../types';
import { obtenerUCsComputacion, cargarDetallesAsignaturas, unidadesCurricularesOpcionales } from '../lib';
import { CodigoHTTP } from '../constants';

export const unidadesCurricularesSemestresController: RequestHandler = async (
  _req: Request,
  res: Response<TrayectoriaRegular[] | ErrorResponse>,
  next: NextFunction
) => {
  try {
    const trayectoriaRegular = await cargarDetallesAsignaturas();

    res.status(CodigoHTTP.OK).json(trayectoriaRegular);
  } catch (error) {
    next(error);
  }
};

export const unidadesCurricularesController: RequestHandler = async (
  _req: Request,
  res: Response<UnidadCurricular[] | ErrorResponse>
) => {
  try {
    const unidadesCurriculares = await obtenerUCsComputacion();
    res.status(CodigoHTTP.OK).json(unidadesCurriculares);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      error: 'Error al cargar las unidades curriculares',
      details: error instanceof Error ? error.message : 'Error desconocido',
    };
    res.status(CodigoHTTP.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
};

export const unidadesCurricularesOpcionalesController: RequestHandler = async (
  _req: Request,
  res: Response<UnidadCurricular[] | ErrorResponse>,
  next: NextFunction
) => {
  try {
    const ucsOpcionales = await unidadesCurricularesOpcionales();

    res.status(CodigoHTTP.OK).json(ucsOpcionales);
  } catch (error) {
    next(error);
  }
};