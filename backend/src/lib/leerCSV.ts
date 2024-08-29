import csv from 'csv-parser';
import fs from 'fs';

const leerCSV = async (ubicacion: string): Promise<Object[]> => {
  return new Promise((resolve, reject) => {
    const resultados: Object[] = [];

    fs.createReadStream(ubicacion)
      .pipe(csv())
      .on('data', fila => resultados.push(fila))
      .on('end', () => resolve(resultados))
      .on('error', err => reject(err));
  });
};

export default leerCSV;
