import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

import { CodigoHTTP } from '../constants';

export const errorMiddleware: ErrorRequestHandler = (
  err: Error & { status?: number },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || CodigoHTTP.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Error interno del servidor';

  console.error(err.stack);
  return res.status(status).json({ error: message });
};
