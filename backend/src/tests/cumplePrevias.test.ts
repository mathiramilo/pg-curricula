import { describe, expect, test } from '@jest/globals';

import previaturas from '../../data/previaturas.json';
import { cumplePrevias } from '../services';
import { InformacionEstudiante, ReglaPreviaturas } from '../types';
import { ie267 } from './mocks';

const CODIGO_PROYECTO_DE_GRADO = '1730';

describe('Tests unitarios (cumple previas)', () => {
  test('Debe retornar false', () => {
    const resultado = cumplePrevias(
      ie267 as InformacionEstudiante,
      previaturas[CODIGO_PROYECTO_DE_GRADO] as ReglaPreviaturas
    );
    expect(resultado).toBe(false);
  });
});
