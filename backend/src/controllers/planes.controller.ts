import { NextFunction, Request, Response } from "express";

import { HTTP_STATUS_CODE } from "@/constants";
import { 
  generarPlanDesdeListado,
  obtenerListadoUCs,
} from "@/services";

export const generarPlanController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { informacionEstudiante, listadoUCs, creditosPorSemestre, semestreInicial } =
    req.body;

  if (!informacionEstudiante || !listadoUCs || !creditosPorSemestre || !semestreInicial) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
      error: "Faltan datos necesarios para generar el plan de estudios",
    });
  }

  try {
    const plan = await generarPlanDesdeListado(
      informacionEstudiante,
      listadoUCs,
      creditosPorSemestre,
      semestreInicial,
    );
    res.status(HTTP_STATUS_CODE.OK).json(plan);
  } catch (error) {
    next(error);
  }
};

export const obtenerUnidadesCurricularesParaPlanController = async (
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
