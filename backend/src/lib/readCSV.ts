import csv from 'csv-parser';
import fs from 'fs';

const readCSV = async (path: string): Promise<Object[]> => {
  return new Promise((resolve, reject) => {
    const results: Object[] = [];

    fs.createReadStream(path)
      .pipe(csv())
      .on('data', row => results.push(row))
      .on('end', () => resolve(results))
      .on('error', err => reject(err));
  });
};

export default readCSV;
