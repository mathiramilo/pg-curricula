import csv from 'csv-parser';
import type { NextFunction, Request, RequestHandler, Response } from 'express';
import fs from 'fs';
import path from 'path';

import { UnidadCurricularCSV } from '@/types';

import trayectoria_sugerida from '../../data/trayectoria_sugerida.json';

export const unidadesCurricularesSemestres: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json(trayectoria_sugerida);
  } catch (error) {
    next(error);
  }
};

export const unidadesCurriculares: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dataPath = path.join(
      __dirname,
      '../../data/lista_materias_computacion.csv'
    );
    const materias: UnidadCurricularCSV[] = [];

    fs.createReadStream(dataPath)
      .pipe(csv())
      .on('data', row => {
        materias.push(row);
      })
      .on('end', () => {
        res.status(200).json({ materias });
      });
  } catch (error) {
    next(error);
  }
};
