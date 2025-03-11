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
  informacionEstudiante.unidadesCurricularesAprobadas[
    unidadCurricular.codigoEnServicioUC
  ] = {
    nombre: unidadCurricular.nombreUC,
    creditos: unidadCurricular.creditosUC,
    concepto: '',
    grupo: grupo,
    area: unidadCurricular.nombreGrupoPadre,
    fecha: '',
    tipoAprobacion: TIPO_APROBACION.EXAMEN,
  };
  informacionEstudiante[grupo] += unidadCurricular.creditosUC;
  informacionEstudiante.creditosTotales += unidadCurricular.creditosUC;
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
  if (semestresActuales.length === 2 || semestresPrevias.length === 2) {
    return 1;
  }

  if (semestresActuales[0] === semestresPrevias[0]) {
    return 2;
  } else {
    return 1;
  }
};
