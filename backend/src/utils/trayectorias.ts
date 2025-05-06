import {
  GrupoHijo,
  InformacionEstudiante,
  SEMESTRE_DE_DICTADO,
  SemestreDeDictado,
  TIPO_APROBACION,
  UnidadCurricular,
} from '../types';

export const actualizarInformacionEstudiante = (
  informacionEstudiante: InformacionEstudiante,
  unidadCurricular: UnidadCurricular,
  grupo: GrupoHijo
): void => {
  informacionEstudiante.unidadesCurricularesAprobadas[unidadCurricular.codigo] =
    {
      codigo: unidadCurricular.codigo,
      nombre: unidadCurricular.nombre,
      creditos: unidadCurricular.creditos,
      concepto: '',
      nombreGrupoHijo: grupo,
      nombreGrupoPadre: unidadCurricular.nombreGrupoPadre,
      fecha: '',
      tipoAprobacion: TIPO_APROBACION.EXAMEN,
    };
  informacionEstudiante[grupo] += unidadCurricular.creditos;
  informacionEstudiante.creditosTotales += unidadCurricular.creditos;
};

export const obtenerSiguienteSemestre = (semestreActual: SemestreDeDictado) => {
  return semestreActual === SEMESTRE_DE_DICTADO.PRIMER_SEMESTRE
    ? SEMESTRE_DE_DICTADO.SEGUNDO_SEMESTRE
    : SEMESTRE_DE_DICTADO.PRIMER_SEMESTRE;
};

export const calcularValorArista = (
  semestresPrevias: SemestreDeDictado[],
  semestresActuales: SemestreDeDictado[]
) => {
  if (semestresActuales.length === 2) {
    return 1;
  }

  //! REVIEW: Esta informacion no la tenemos en este punto, recien la tenemos al momento de asignar unidades curriculares a semestres
  if (semestresPrevias.length === 2 && semestresActuales.length === 1) {
    return 3;
  }

  if (semestresActuales[0] === semestresPrevias[0]) {
    return 2;
  } else {
    return 1;
  }
};

export const seDictaEsteSemestre = (
  semestreActual: number,
  semestres: SemestreDeDictado[]
) => {
  if (!semestres.length) return false;
  if (semestres.length === 2) return true;

  const esImpar = semestreActual % 2 === 1;
  const esPar = semestreActual % 2 === 0;

  if (semestres[0] === SEMESTRE_DE_DICTADO.PRIMER_SEMESTRE && esImpar)
    return true;
  if (semestres[0] === SEMESTRE_DE_DICTADO.SEGUNDO_SEMESTRE && esPar)
    return true;

  return false;
};
