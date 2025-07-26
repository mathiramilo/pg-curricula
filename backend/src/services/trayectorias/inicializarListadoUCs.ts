import previaturas from "@/data/previaturas.json";
import ucsObligatorias from "@/data/ucs-obligatorias.json";
import unidadesCurricularesJson from "@/data/unidades-curriculares.json";
import {
  InformacionEstudiante,
  ReglaPreviaturas,
  UnidadCurricular,
} from "@/types";
import { actualizarInformacionEstudiante } from "@/utils";
import { cumplePreviaturas } from "../previaturas.service";

const UCS_EXCEPCIONALES = [{ nombre: "PROYECTO DE GRADO", codigo: "1730" }];

const previaturasTyped = previaturas as Record<string, ReglaPreviaturas>;

export const inicializarListadoUCs = (
  informacionEstudiante: InformacionEstudiante,
): UnidadCurricular[] => {
  const listadoUCs: UnidadCurricular[] = [];

  const ucsObligatoriasFiltradas = ucsObligatorias.filter(
    (unidadCurricular) =>
      !Object.hasOwn(
        informacionEstudiante.unidadesCurricularesAprobadas,
        unidadCurricular.codigo,
      ),
  );

  const ucsObligatoriasFaltantes = ucsObligatoriasFiltradas
    .map((unidadCurricular) => {
      return unidadesCurricularesJson.find(
        (uc) => uc.codigo === unidadCurricular.codigo,
      ) as UnidadCurricular;
    })
    .filter((uc) => uc);

  // Para que esto funcione el listado de materias obligatorias debe estar ordenado, empezando por las que tienen menos previas, para que la funcion "cumplePrevias" retorne true.
  ucsObligatoriasFaltantes.forEach((unidadCurricular) => {
    if (
      cumplePreviaturas(
        informacionEstudiante,
        previaturasTyped[unidadCurricular.codigo],
      ) ||
      UCS_EXCEPCIONALES.find((uc) => uc.codigo === unidadCurricular.codigo)
    ) {
      listadoUCs.push(unidadCurricular);

      actualizarInformacionEstudiante(
        informacionEstudiante,
        unidadCurricular,
        unidadCurricular.nombreGrupoHijo,
      );
    }
  });

  return listadoUCs;
};
