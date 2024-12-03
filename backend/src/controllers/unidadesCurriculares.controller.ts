import type { Request, RequestHandler, Response } from 'express';

import { trayectoria_regular } from '../../data/trayectoria_sugerida.json';
import { ErrorResponse, UnidadCurricular } from '@/types';
import { obtenerUCsComputacion, obtenerUCsActuales } from '../lib/obtenerUCs';

type TrayectoriaRegular = {
  semestre: number;
  asignaturas: {
    nombre: string;
  }[];
};

export const unidadesCurricularesSemestres: RequestHandler = async (
  _req: Request,
  res: Response<TrayectoriaRegular[] | ErrorResponse>
) => {
  try {
    await cargarDetallesAsignaturas(trayectoria_regular);
    res.status(200).json(trayectoria_regular);
  } catch (error: unknown) {
    const errorResponse: ErrorResponse = {
      error: 'Error al cargar las unidades curriculares por semestre',
      details: error instanceof Error ? error.message : 'Error desconocido',
    };
    res.status(500).json(errorResponse);
  }
};

/**
 * Modifica el objeto `TrayectoriaRegular` para agregar códigos a las asignaturas
 * utilizando los datos de un archivo CSV.
 * @param trayectoria - El arreglo de semestres (TrayectoriaRegular) que será modificado.
 * @returns Una promesa que se resuelve cuando se completa la modificación.
 */
const cargarDetallesAsignaturas = async (
  trayectoria: TrayectoriaRegular[]
): Promise<void> => {
  try {
    const unidadesCurriculares = await obtenerUCsComputacion();

    trayectoria.forEach(semestre => {
      semestre.asignaturas.forEach(asignatura => {
        const unidadCurricular = unidadesCurriculares.find(
          uc => uc.nombre === asignatura.nombre
        );

        if (unidadCurricular) {
          asignatura['codigo'] = unidadCurricular.codigo;
        }
      });
    });
  } catch (error) {
    console.error('Error al cargar los detalles de las unidades curriculares:', error);
    throw new Error('Error al cargar los detalles de las unidades curriculares');
  }
};

export const unidadesCurriculares: RequestHandler = async (
  _req: Request,
  res: Response<UnidadCurricular[] | ErrorResponse>
) => {
  try {
    const unidadesCurriculares = await obtenerUCsComputacion();
    res.status(200).json(unidadesCurriculares);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      error: 'Error al cargar las unidades curriculares',
      details: error instanceof Error ? error.message : 'Error desconocido',
    };
    res.status(500).json(errorResponse);
  }
};

export const unidadesCurricularesOpcionales: RequestHandler = async (
  _req: Request,
  res: Response<UnidadCurricular[] | ErrorResponse>
) => {
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
    const ucsOpcionales = ucsActualOpcionales.filter(ucs => !ucsTrayectoria.has(ucs.nombre.toUpperCase()));

    res.status(200).json(ucsOpcionales);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      error: 'Error al cargar las unidades curriculares opcionales',
      details: error instanceof Error ? error.message : 'Error desconocido',
    };
    res.status(500).json(errorResponse);
  }
};