import type { NextFunction, Request, Response } from "express";

import { HTTP_STATUS_CODE } from "@/constants";
import {
  obtenerTrayectoriaSugerida,
  obtenerUnidadesCurriculares,
  obtenerUnidadesCurricularesObligatorias,
} from "@/services";

export const obtenerUnidadesCurricularesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { informacionEstudiante } = req.body;
  const filter = { ...req.query };
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 60;

  if (!informacionEstudiante) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
      error: "No se proporcionó la información del estudiante",
    });
  }

  try {
    const unidadesCurriculares = await obtenerUnidadesCurriculares(
      informacionEstudiante,
      filter,
      +page,
      +pageSize,
    );
    res.status(HTTP_STATUS_CODE.OK).json(unidadesCurriculares);
  } catch (error) {
    next(error);
  }
};

export const obtenerTrayectoriaSugeridaController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const trayectoriaSugerida = await obtenerTrayectoriaSugerida();
    res.status(HTTP_STATUS_CODE.OK).json(trayectoriaSugerida);
  } catch (error) {
    next(error);
  }
};

export const obtenerUnidadesCurricularesObligatoriasController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ucsObligatorias = obtenerUnidadesCurricularesObligatorias();
    res.status(HTTP_STATUS_CODE.OK).json(ucsObligatorias);
  } catch (error) {
    next(error);
  }
};
