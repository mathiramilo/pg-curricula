import { NextFunction, Request, Response } from "express";

import { HTTP_STATUS_CODE } from "@/constants";
import {
  generarPlan,
  inicializarListadoUCs,
  obtenerListadoUCs,
} from "@/services";

export const generarPlanController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    informacionEstudiante,
    listadoUCs,
    creditosPorSemestre,
    semestreInicial,
  } = req.body;

  if (
    !informacionEstudiante ||
    !listadoUCs ||
    !creditosPorSemestre ||
    !semestreInicial
  ) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
      error: "Faltan datos necesarios para generar el plan de estudios",
    });
  }

  try {
    const result = await generarPlan(
      informacionEstudiante,
      listadoUCs,
      creditosPorSemestre,
      semestreInicial,
    );

    if (!result.success)
      return res
        .status(HTTP_STATUS_CODE.UNPROCESSABLE_CONTENT)
        .json(result.errors);

    res.status(HTTP_STATUS_CODE.OK).json(result.plan);
  } catch (error) {
    next(error);
  }
};

export const inicializarListadoUCsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { informacionEstudiante } = req.body;

  if (!informacionEstudiante) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
      error: "No se proporcionó la información del estudiante",
    });
  }

  try {
    const listadoUCs = inicializarListadoUCs(informacionEstudiante);
    res.status(HTTP_STATUS_CODE.OK).json(listadoUCs);
  } catch (error) {
    next(error);
  }
};

export const generarListadoUCsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { informacionEstudiante } = req.body;

  if (!informacionEstudiante) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
      error: "No se proporcionó la información del estudiante",
    });
  }

  try {
    const listadoUCs = obtenerListadoUCs(informacionEstudiante);
    res.status(HTTP_STATUS_CODE.OK).json(listadoUCs);
  } catch (error) {
    next(error);
  }
};
