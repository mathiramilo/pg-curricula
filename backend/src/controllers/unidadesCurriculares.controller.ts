import csv from 'csv-parser';
import type { NextFunction, Request, RequestHandler, Response } from 'express';
import fs from 'fs';
import path from 'path';

import { UnidadCurricular } from '@/types';

export const unidadesCurricularesSemestres: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dataPath = path.join(
      __dirname,
      '../../data/trayectoria_sugerida.json'
    );
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(rawData);

    res.status(200).json(data);
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
    const materias: UnidadCurricular[] = [];

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
