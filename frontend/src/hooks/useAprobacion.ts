import { TIPO_APROBACION } from "@/models";
import { useStore } from "@/store";

export const useAprobacion = (nombre: string) => {
  const tipoAprobacion = useStore(
    (state) =>
      state.informacionEstudiante.unidadesCurricularesAprobadas?.[nombre]
        ?.tipoAprobacion,
  );

  const cursoAprobado =
    tipoAprobacion === TIPO_APROBACION.CURSO ||
    tipoAprobacion === TIPO_APROBACION.EXAMEN;
  const examenAprobado = tipoAprobacion === TIPO_APROBACION.EXAMEN;

  return { cursoAprobado, examenAprobado };
};
