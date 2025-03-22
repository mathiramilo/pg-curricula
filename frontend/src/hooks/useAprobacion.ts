import type { UnidadCurricular } from "@/models";
import { TIPO_APROBACION } from "@/models";
import { useInformacionEstudianteStore } from "@/store";

export const useAprobacion = (
  codigoEnServicioUC: UnidadCurricular["codigoEnServicioUC"],
) => {
  const tipoAprobacion = useInformacionEstudianteStore(
    (state) =>
      state.informacionEstudiante.unidadesCurricularesAprobadas?.[
        codigoEnServicioUC
      ]?.tipoAprobacion,
  );

  const cursoAprobado =
    tipoAprobacion === TIPO_APROBACION.CURSO ||
    tipoAprobacion === TIPO_APROBACION.EXAMEN;
  const examenAprobado = tipoAprobacion === TIPO_APROBACION.EXAMEN;

  return { cursoAprobado, examenAprobado };
};
