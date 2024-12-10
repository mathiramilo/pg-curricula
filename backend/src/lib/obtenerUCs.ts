import csv from 'csv-parser';
import { createReadStream } from 'fs';
import path from 'path';

import { TrayectoriaRegular, UnidadCurricular } from '../types';
import { trayectoria_regular } from '../../data/trayectoria_sugerida.json';

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

/**
 * Modifica el objeto `TrayectoriaRegular` para agregar códigos a las asignaturas
 * utilizando los datos de un archivo CSV.
 * @param trayectoria - El arreglo de semestres (TrayectoriaRegular) que será modificado.
 * @returns Una promesa que se resuelve cuando se completa la modificación.
 */
export const cargarDetallesAsignaturas = async (): Promise<TrayectoriaRegular[]> => {
  try {
    const unidadesCurriculares = await obtenerUCsComputacion();

    trayectoria_regular.forEach(semestre => {
      semestre.asignaturas.forEach(asignatura => {
        const unidadCurricular = unidadesCurriculares.find(
          uc => uc.nombre === asignatura.nombre
        );

        if (unidadCurricular) {
          asignatura['codigo'] = unidadCurricular.codigo;
        }
      });
    });

    return trayectoria_regular;
  } catch (error) {
    console.error('Error al cargar los detalles de las unidades curriculares:', error);
    throw new Error('Error al cargar los detalles de las unidades curriculares');
  }
};

export const unidadesCurricularesOpcionales = async (): Promise<UnidadCurricular[]> => {
  try {
    // Unidades curriculares de ingenieria actuales
    const ucActuales = await obtenerUCsActuales();

    // Unidades curriculares de computacion
    const unidadesCurriculares = await obtenerUCsComputacion();
    const setUnidadesCurriculares = new Set(unidadesCurriculares.map(uc => uc.nombre));

    // Filtrar todas las ucs actuales con la de la carrera de computacion
    const ucsActualOpcionales = ucActuales.filter(ucs => setUnidadesCurriculares.has(ucs.nombre.toUpperCase()))

    const ucsTrayectoria = new Set(trayectoria_regular.flatMap((semestre) =>
      semestre.asignaturas.map((asignatura) => asignatura.nombre.toUpperCase())
    ));

    // Filtrar todas las ucs menos las de la trayectoria sugerida
    return ucsActualOpcionales.filter(ucs => !ucsTrayectoria.has(ucs.nombre.toUpperCase()));
  } catch (error) {
    console.error('Error al cargar los detalles de las unidades curriculares:', error);
    throw new Error('Error al cargar los detalles de las unidades curriculares');
  }
}