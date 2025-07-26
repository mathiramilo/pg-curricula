import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

import { HTTP_STATUS_CODE } from "@/constants";

export const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const message = err.message || "Ha ocurrido un error inesperado";

  console.error(err.stack);

  return res
    .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
    .json({ error: message });
};
