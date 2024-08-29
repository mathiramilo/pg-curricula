import { CodigoHTTP } from '../constants/http';

const errorMiddleware = (err, req, res, next) => {
  const status = err.status || CodigoHTTP.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Error interno del servidor';

  console.error(err.stack);
  return res.status(status).json({ error: message });
};

export default errorMiddleware;
