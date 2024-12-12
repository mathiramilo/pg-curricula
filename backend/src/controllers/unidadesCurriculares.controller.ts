import type { NextFunction, Request, RequestHandler, Response } from 'express';

import { ErrorResponse } from '../types';
import { obtenerUCsComputacion, cargarDetallesAsignaturas, unidadesCurricularesOpcionales } from '../lib';
import { CodigoHTTP } from '../constants';

export const unidadesCurricularesSemestresController: RequestHandler = async (
  _req: Request,
  res: Response,
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
  res: Response
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
  res: Response,
  next: NextFunction
) => {
  try {
    const ucsOpcionales = await unidadesCurricularesOpcionales();

    res.status(CodigoHTTP.OK).json(ucsOpcionales);
  } catch (error) {
    next(error);
  }
};