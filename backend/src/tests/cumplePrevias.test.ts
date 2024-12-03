import { describe, expect, test } from '@jest/globals';

import previaturas from '../../data/previaturas.json';
import { cumplePrevias } from '../lib';
import { InformacionEstudiante, ReglaPreviaturas } from '../types';
import { ie340, ie366, ie410 } from './mocks';

describe('Tests unitarios (cumple previas)', () => {
  test('Debe retornar true', () => {
    const resultado = cumplePrevias(
      ie366 as InformacionEstudiante,
      previaturas['PROYECTO DE GRADO'] as ReglaPreviaturas
    );
    expect(resultado).toBe(true);
  });

  test('Debe retornar false', () => {
    const resultado = cumplePrevias(
      ie340 as InformacionEstudiante,
      previaturas['PROYECTO DE GRADO'] as ReglaPreviaturas
    );
    expect(resultado).toBe(false);
  });

  test('Debe retornar true', () => {
    const resultado = cumplePrevias(
      ie410 as InformacionEstudiante,
      previaturas['PROYECTO DE GRADO'] as ReglaPreviaturas
    );
    expect(resultado).toBe(true);
  });
});
