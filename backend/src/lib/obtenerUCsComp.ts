//! Creo que este archivo no va a ser utilizado, pero lo dejo por si acaso
import csv from 'csv-parser';
import fs from 'fs';

/**
 * @deprecated No se va a utilizar
 */
export const obtenerUCsComp = (): void => {
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
      console.log('Archivo CSV procesado satisfactoriamente');
      console.log(listaMateriasComputacion); // Muestra todas las materias
    });
};
