import { NextFunction, Request, Response } from "express";

import { HTTP_STATUS_CODE } from "@/constants";
import previaturas from "@/data/previaturas.json";
import { cumplePreviaturas } from "@/services";
import { ReglaPreviaturas, type InformacionEstudiante } from "@/types";

const previaturasTyped = previaturas as Record<string, ReglaPreviaturas>;

export const obtenerPreviaturasController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { codigo } = req.params;

  try {
    if (!codigo)
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        error: "No se proporcionó el código de la unidad curricular a chequear",
      });

    if (!previaturasTyped[codigo])
      return res.status(HTTP_STATUS_CODE.NO_CONTENT).json(null);

    return res.status(HTTP_STATUS_CODE.OK).json(previaturasTyped[codigo]);
  } catch (error) {
    next(error);
  }
};

export const satisfacePreviaturasController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { codigo } = req.params;
  const informacionEstudiante = req.body;

  try {
    if (!codigo)
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        error: "No se proporcionó el código de la unidad curricular a chequear",
      });

    if (!previaturasTyped[codigo])
      return res.status(HTTP_STATUS_CODE.OK).json(true);

    const cumple = cumplePreviaturas(
      informacionEstudiante as InformacionEstudiante,
      previaturasTyped[codigo],
    );
    return res.status(HTTP_STATUS_CODE.OK).json(cumple);
  } catch (error) {
    next(error);
  }
};
