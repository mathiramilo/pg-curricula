import csv from 'csv-parser';
import fs from 'fs';

enum TipoDescriptor {
  examen = 'E',
  curso = 'C',
}

class Modelos {
  readCSV = (filePath: string): Promise<any[]> => {
    return new Promise<any[]>((resolve, reject) => {
      const results: any[] = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', row => results.push(row))
        .on('end', () => resolve(results))
        .on('error', error => reject(error));
    });
  };

  // Leer csv
  obtenerMateriasPrevias = async (
    tipoDescriptor: TipoDescriptor,
  ): Promise<Object> => {
    const rows = await this.readCSV('data/previaturas2.csv');
    const resultado: { [codMateria: string]: any[] } = {}; // Nuevo objeto para almacenar los resultados

    rows.forEach(row => {
      // Convertir el cod_materia a número para usarlo como clave
      // Estaria bueno usar cod_materia porque son todos numeros pero la refencia de cod_elemento no esta bien,
      // ejemplo Fundamentos Base de datos
      const codMateria = row.codenservicio_mat;

      // Guardar la materia en el objeto
      if (!resultado[codMateria]) {
        resultado[codMateria] = [];
      }

      // Acumular las restricciones dado tipo_instancia
      if (row.tipo_descriptor === tipoDescriptor) {
        resultado[codMateria].push(row);
      }
    });

    console.log('Archivo CSV leido correctamente.');
    return resultado;
  };
}

export default Modelos;
