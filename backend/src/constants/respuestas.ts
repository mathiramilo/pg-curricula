import { CodigoHTTP } from './http';

type RespuestaHTTP<T> =
  | {
      exito: true;
      datos: T;
      codigo: CodigoHTTP;
    }
  | {
      exito: false;
      mensaje: string;
      codigo: CodigoHTTP;
    };

export const respuestaExitosa = <T>(
  datos: T,
  codigo: CodigoHTTP
): RespuestaHTTP<T> => {
  return {
    exito: true,
    datos,
    codigo
  };
};

export const respuestaFallida = (
  mensaje: string,
  codigo: CodigoHTTP
): RespuestaHTTP<never> => {
  return {
    exito: false,
    mensaje,
    codigo
  };
};
