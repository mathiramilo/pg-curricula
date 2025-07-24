import { create } from "zustand";
import { persist } from "zustand/middleware";

import { GRUPO_VALUES, TIPO_APROBACION } from "@/models";
import type {
  Grupo,
  InformacionEstudiante,
  UnidadCurricularAprobada,
} from "@/models";

interface InformacionEstudianteStore {
  informacionEstudiante: InformacionEstudiante;
  setInformacionEstudiante: (
    informacionEstudiante: InformacionEstudiante,
  ) => void;
  addUnidadCurricularCurso: (
    unidadCurricular: UnidadCurricularAprobada,
  ) => void;
  addUnidadCurricularExamen: (
    unidadCurricular: UnidadCurricularAprobada,
  ) => void;
  removeUnidadCurricularCurso: (
    unidadCurricular: UnidadCurricularAprobada,
  ) => void;
  removeUnidadCurricularExamen: (
    unidadCurricular: UnidadCurricularAprobada,
  ) => void;
  resetInformacionEstudiante: () => void;
}

export const initialInformacionEstudiante: InformacionEstudiante = {
  unidadesCurricularesAprobadas: {},
  creditosTotales: 0,
  modulosTaller: 0,
  modulosExtension: 0,
  ...(Object.fromEntries(GRUPO_VALUES.map((grupo) => [grupo, 0])) as Record<
    Grupo,
    number
  >),
};

export const useInformacionEstudianteStore =
  create<InformacionEstudianteStore>()(
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
                [unidadCurricular.codigo]: {
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
                [unidadCurricular.codigo]: {
                  ...unidadCurricular,
                  tipoAprobacion: TIPO_APROBACION.EXAMEN,
                },
              },
              creditosTotales:
                state.informacionEstudiante.creditosTotales +
                unidadCurricular.creditos,
              [unidadCurricular.nombreGrupoHijo]:
                state.informacionEstudiante[unidadCurricular.nombreGrupoHijo] +
                unidadCurricular.creditos,
            },
          })),

        removeUnidadCurricularCurso: (unidadCurricular) =>
          set((state) => {
            const examenAprobado =
              state.informacionEstudiante.unidadesCurricularesAprobadas[
                unidadCurricular.codigo
              ].tipoAprobacion === TIPO_APROBACION.EXAMEN;

            const updatedUCsAprobadas = Object.fromEntries(
              Object.entries(
                state.informacionEstudiante.unidadesCurricularesAprobadas,
              ).filter(([codigo]) => codigo !== unidadCurricular.codigo),
            );

            return {
              informacionEstudiante: {
                ...state.informacionEstudiante,
                unidadesCurricularesAprobadas: updatedUCsAprobadas,
                creditosTotales: examenAprobado
                  ? state.informacionEstudiante.creditosTotales -
                    unidadCurricular.creditos
                  : state.informacionEstudiante.creditosTotales,
                [unidadCurricular.nombreGrupoHijo]: examenAprobado
                  ? state.informacionEstudiante[
                      unidadCurricular.nombreGrupoHijo
                    ] - unidadCurricular.creditos
                  : state.informacionEstudiante[
                      unidadCurricular.nombreGrupoHijo
                    ],
              },
            };
          }),

        removeUnidadCurricularExamen: (unidadCurricular) =>
          set((state) => ({
            informacionEstudiante: {
              ...state.informacionEstudiante,
              unidadesCurricularesAprobadas: {
                ...state.informacionEstudiante.unidadesCurricularesAprobadas,
                [unidadCurricular.codigo]: {
                  ...state.informacionEstudiante.unidadesCurricularesAprobadas[
                    unidadCurricular.codigo
                  ],
                  tipoAprobacion: TIPO_APROBACION.CURSO,
                },
              },
              creditosTotales:
                state.informacionEstudiante.creditosTotales -
                unidadCurricular.creditos,
              [unidadCurricular.nombreGrupoHijo]:
                state.informacionEstudiante[unidadCurricular.nombreGrupoHijo] -
                unidadCurricular.creditos,
            },
          })),

        resetInformacionEstudiante: () =>
          set(() => ({
            informacionEstudiante: initialInformacionEstudiante,
          })),
      }),
      {
        name: "informacion-estudiante-store",
      },
    ),
  );
