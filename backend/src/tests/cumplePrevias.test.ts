import { describe, expect, test } from '@jest/globals';

import previaturas from '../../data/previaturas.json';
import { cumplePrevias } from '../services';
import { InformacionEstudiante, ReglaPreviaturas } from '../types';
import { ie274, ie389, ie419, ie295 } from './mocks';

const CODIGO_PROYECTO_DE_GRADO = '1730';
const CODIGO_REDES_COMPUTADORAS = '1446';

describe('Tests unitarios (cumple previas) - Proyecto de Grado', () => {
  test('Debe retornar true', () => {
    const resultado = cumplePrevias(
      ie389 as InformacionEstudiante,
      previaturas[CODIGO_PROYECTO_DE_GRADO] as ReglaPreviaturas
    );
    expect(resultado).toBe(true);
  });

  test('Debe retornar true', () => {
    const resultado = cumplePrevias(
      ie419 as InformacionEstudiante,
      previaturas[CODIGO_PROYECTO_DE_GRADO] as ReglaPreviaturas
    );
    expect(resultado).toBe(true);
  });

  test('Debe retornar false', () => {
    const resultado = cumplePrevias(
      ie274 as InformacionEstudiante,
      previaturas[CODIGO_PROYECTO_DE_GRADO] as ReglaPreviaturas
    );
    expect(resultado).toBe(false);
  });

  test('Debe retornar false', () => {
    const resultado = cumplePrevias(
      ie295 as InformacionEstudiante,
      previaturas[CODIGO_PROYECTO_DE_GRADO] as ReglaPreviaturas
    );
    expect(resultado).toBe(false);
  });
});

describe('Tests unitarios (cumple previas) - Redes de Computadoras', () => {
  test('Debe retornar true', () => {
    const resultado = cumplePrevias(
      ie274 as InformacionEstudiante,
      previaturas[CODIGO_REDES_COMPUTADORAS] as ReglaPreviaturas
    );
    expect(resultado).toBe(true);
  });

  test('Debe retornar false', () => {
    const resultado = cumplePrevias(
      ie295 as InformacionEstudiante,
      previaturas[CODIGO_REDES_COMPUTADORAS] as ReglaPreviaturas
    );
    expect(resultado).toBe(false);
  });
});
