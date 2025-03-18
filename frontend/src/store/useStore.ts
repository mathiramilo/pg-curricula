import { create } from "zustand";
import { persist } from "zustand/middleware";

import { GRUPO_VALUES, TIPO_APROBACION } from "@/models";
import type { Grupo, InformacionEstudiante, UnidadCurricular } from "@/models";

export interface Store {
  informacionEstudiante: InformacionEstudiante;
  setInformacionEstudiante: (
    informacionEstudiante: InformacionEstudiante,
  ) => void;
  addUnidadCurricularCurso: (unidadCurricular: UnidadCurricular) => void;
  addUnidadCurricularExamen: (unidadCurricular: UnidadCurricular) => void;
  removeUnidadCurricularCurso: (unidadCurricular: UnidadCurricular) => void;
  removeUnidadCurricularExamen: (unidadCurricular: UnidadCurricular) => void;
  resetInformacionEstudiante: () => void;
}

const initialInformacionEstudiante: InformacionEstudiante = {
  unidadesCurricularesAprobadas: {},
  creditosTotales: 0,
  ...(Object.fromEntries(GRUPO_VALUES.map((grupo) => [grupo, 0])) as Record<
    Grupo,
    number
  >),
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      informacionEstudiante: initialInformacionEstudiante,
      setInformacionEstudiante: (informacionEstudiante) =>
        set({ informacionEstudiante }),
      addUnidadCurricularCurso: (unidadCurricular) =>
        set((state) => ({
          informacionEstudiante: {
            ...state.informacionEstudiante,
            unidadesCurricularesAprobadas: {
              ...state.informacionEstudiante.unidadesCurricularesAprobadas,
              [unidadCurricular.codigoEnServicioUC]: {
                ...unidadCurricular,
                tipoAprobacion: TIPO_APROBACION.CURSO,
              },
            },
          },
        })),
      addUnidadCurricularExamen: (unidadCurricular) =>
        set((state) => ({
          informacionEstudiante: {
            ...state.informacionEstudiante,
            unidadesCurricularesAprobadas: {
              ...state.informacionEstudiante.unidadesCurricularesAprobadas,
              [unidadCurricular.codigoEnServicioUC]: {
                ...unidadCurricular,
                tipoAprobacion: TIPO_APROBACION.EXAMEN,
              },
            },
            creditosTotales:
              state.informacionEstudiante.creditosTotales +
              unidadCurricular.creditosUC,
            [unidadCurricular.nombreGrupoHijo]:
              state.informacionEstudiante[unidadCurricular.nombreGrupoHijo] +
              unidadCurricular.creditosUC,
          },
        })),
      removeUnidadCurricularCurso: (unidadCurricular) =>
        set((state) => {
          const examenAprobado =
            state.informacionEstudiante.unidadesCurricularesAprobadas[
              unidadCurricular.codigoEnServicioUC
            ].tipoAprobacion === TIPO_APROBACION.EXAMEN;

          const updatedUCsAprobadas = Object.fromEntries(
            Object.entries(
              state.informacionEstudiante.unidadesCurricularesAprobadas,
            ).filter(
              ([codigoEnServicioUC]) =>
                codigoEnServicioUC !== unidadCurricular.codigoEnServicioUC,
            ),
          );

          return {
            informacionEstudiante: {
              ...state.informacionEstudiante,
              unidadesCurricularesAprobadas: updatedUCsAprobadas,
              creditosTotales: examenAprobado
                ? state.informacionEstudiante.creditosTotales -
                  unidadCurricular.creditosUC
                : state.informacionEstudiante.creditosTotales,
              [unidadCurricular.nombreGrupoHijo]: examenAprobado
                ? state.informacionEstudiante[
                    unidadCurricular.nombreGrupoHijo
                  ] - unidadCurricular.creditosUC
                : state.informacionEstudiante[unidadCurricular.nombreGrupoHijo],
            },
          };
        }),
      removeUnidadCurricularExamen: (unidadCurricular) =>
        set((state) => ({
          informacionEstudiante: {
            ...state.informacionEstudiante,
            unidadesCurricularesAprobadas: {
              ...state.informacionEstudiante.unidadesCurricularesAprobadas,
              [unidadCurricular.codigoEnServicioUC]: {
                ...state.informacionEstudiante.unidadesCurricularesAprobadas[
                  unidadCurricular.codigoEnServicioUC
                ],
                tipoAprobacion: TIPO_APROBACION.CURSO,
              },
            },
            creditosTotales:
              state.informacionEstudiante.creditosTotales -
              unidadCurricular.creditosUC,
            [unidadCurricular.nombreGrupoHijo]:
              state.informacionEstudiante[unidadCurricular.nombreGrupoHijo] -
              unidadCurricular.creditosUC,
          },
        })),
      resetInformacionEstudiante: () =>
        set(() => ({
          informacionEstudiante: initialInformacionEstudiante,
        })),
    }),
    {
      name: "store",
    },
  ),
);
