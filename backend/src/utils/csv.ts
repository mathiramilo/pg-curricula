import fs from "fs";
import csv from "csv-parser";

export const leerCSV = async (ubicacion: string): Promise<object[]> => {
  return new Promise((resolve, reject) => {
    const resultados: object[] = [];

    fs.createReadStream(ubicacion)
      .pipe(csv())
      .on("data", (row) => resultados.push(row))
      .on("end", () => resolve(resultados))
      .on("error", (err) => reject(err));
  });
};
