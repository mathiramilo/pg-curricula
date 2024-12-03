import csv from 'csv-parser';
import { createReadStream } from 'fs';
import path from 'path';

import { UnidadCurricular } from '@/types';

/**
 * Función para obtener las unidades curriculares de computación desde un archivo CSV.
 */
export const obtenerUCsComputacion = async (): Promise<UnidadCurricular[]> => {
  const dataPath = path.join(
    __dirname,
    '../../data/lista-materias-computacion.csv'
  );
  const unidadesCurriculares: UnidadCurricular[] = [];

  try {
    // Crear el Stream
    const stream = createReadStream(dataPath).pipe(csv());

    for await (const row of stream) {
      unidadesCurriculares.push({
        codigo: row.cod_materia,
        nombre: row.nombre_mat,
      });
    }

    return unidadesCurriculares;
  } catch (error) {
    console.error('Error al procesar el archivo CSV:', error);
    throw new Error('No se pudo procesar el archivo CSV. Por favor, verifica el archivo o los datos.');
  }
};

/**
 * Función para obtener las unidades curriculares ingenieria desde un archivo CSV.
 */
export const obtenerUCsActuales = async (): Promise<UnidadCurricular[]> => {
  const dataPath = path.join(
    __dirname,
    '../../data/lista_materias_2021.csv'
  );
  const unidadesCurriculares: UnidadCurricular[] = [];

  try {
    // Crear el Stream
    const stream = createReadStream(dataPath).pipe(csv());

    for await (const row of stream) {
      unidadesCurriculares.push({
        codigo: row.cod_materia,
        nombre: row.nombre_mat,
        semestre: parseInt(row.semestre),
      });
    }

    return unidadesCurriculares;
  } catch (error) {
    console.error('Error al procesar el archivo CSV:', error);
    throw new Error('No se pudo procesar el archivo CSV. Por favor, verifica el archivo o los datos.');
  }
};
