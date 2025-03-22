import csv from 'csv-parser';
import fs from 'fs';

export const leerCSV = async (ubicacion: string): Promise<Object[]> => {
  return new Promise((resolve, reject) => {
    const resultados: Object[] = [];

    fs.createReadStream(ubicacion)
      .pipe(csv())
      .on('data', (row) => resultados.push(row))
      .on('end', () => resolve(resultados))
      .on('error', (err) => reject(err));
  });
};
