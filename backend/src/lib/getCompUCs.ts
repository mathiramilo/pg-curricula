import csv from 'csv-parser';
import fs from 'fs';

const listaMateriasComputacion: Object = {};

fs.createReadStream('../../data/lista_materias_computacion.csv')
  .pipe(csv())
  .on('data', row => {
    // Convertir el cod_materia a número para usarlo como clave
    // Estaria bueno usar cod_materia porque son todos numeros pero la refencia de cod_elemento no esta bien,
    // ejemplo Fundamentos Base de datos
    const codMateria = row.codenservicio_mat;

    // Guardar la materia en el objeto
    listaMateriasComputacion[codMateria] = row;
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    console.log(listaMateriasComputacion); // Muestra todas las materias
  });
