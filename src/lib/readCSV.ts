import csv from 'csv-parser';
import fs from 'fs';

const materias: Object[] = [];

fs.createReadStream('data/previaturas2.csv')
  .pipe(csv())
  .on('data', row => {
    // Convertir las columnas relevantes a los tipos apropiados
    materias.push({
      cod_materia: parseInt(row.cod_materia),
      cod_condicion_padre: row.cod_condicion_padre
        ? parseInt(row.cod_condicion_padre)
        : null,
      tipo: row.tipo,
      tipo_instancia: row.tipo_instancia,
      nombre_mat: row.nombre_mat,
      cant_creditos: row.cant_creditos ? parseInt(row.cant_creditos) : null,
      cod_grupo: row.cod_grupo ? parseInt(row.cod_grupo) : null
    });
  })
  .on('end', () => {
    console.log('CSV file successfully processed');

    console.log(materias);
  });

const listaMateriasComputacion: Object = {};

fs.createReadStream('data/lista_materias_computacion.csv')
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
