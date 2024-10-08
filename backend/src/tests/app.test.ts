import { describe, expect, test } from '@jest/globals';

import previaturas from '../../data/previaturas.json';
import { cumplePrevias } from '../lib';
import { InformacionEstudiante, ReglaPreviaturas } from '../types';
import { ie340, ie366 } from './mocks';

describe('cumplePrevias function unit tests', () => {
  test('Should return true', () => {
    const result = cumplePrevias(
      ie366 as InformacionEstudiante,
      previaturas['PROYECTO DE GRADO'] as ReglaPreviaturas
    );
    expect(result).toBe(true);
  });

  test('Should return false', () => {
    const result = cumplePrevias(
      ie340 as InformacionEstudiante,
      previaturas['PROYECTO DE GRADO'] as ReglaPreviaturas
    );
    expect(result).toBe(false);
  });
});
