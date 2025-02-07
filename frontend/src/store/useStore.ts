import { create } from "zustand";
import { persist } from "zustand/middleware";

import { GRUPO_VALUES, TIPO_APROBACION } from "@/models";
import type { Grupo, InformacionEstudiante, UnidadCurricular } from "@/models";

interface Store {
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
              [unidadCurricular.nombre]: {
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
              [unidadCurricular.nombre]: {
                ...unidadCurricular,
                tipoAprobacion: TIPO_APROBACION.EXAMEN,
              },
            },
            creditosTotales:
              state.informacionEstudiante.creditosTotales +
              unidadCurricular.creditos,
            [unidadCurricular.grupo]:
              state.informacionEstudiante[unidadCurricular.grupo] +
              unidadCurricular.creditos,
          },
        })),
      removeUnidadCurricularCurso: (unidadCurricular) =>
        set((state) => {
          const examenAprobado =
            state.informacionEstudiante.unidadesCurricularesAprobadas[
              unidadCurricular.nombre
            ].tipoAprobacion === TIPO_APROBACION.EXAMEN;

          const updatedUCsAprobadas = Object.fromEntries(
            Object.entries(
              state.informacionEstudiante.unidadesCurricularesAprobadas,
            ).filter(([nombre]) => nombre !== unidadCurricular.nombre),
          );

          return {
            informacionEstudiante: {
              ...state.informacionEstudiante,
              unidadesCurricularesAprobadas: updatedUCsAprobadas,
              creditosTotales: examenAprobado
                ? state.informacionEstudiante.creditosTotales -
                  unidadCurricular.creditos
                : state.informacionEstudiante.creditosTotales,
              [unidadCurricular.grupo]: examenAprobado
                ? state.informacionEstudiante[unidadCurricular.grupo] -
                  unidadCurricular.creditos
                : state.informacionEstudiante[unidadCurricular.grupo],
            },
          };
        }),
      removeUnidadCurricularExamen: (unidadCurricular) =>
        set((state) => ({
          informacionEstudiante: {
            ...state.informacionEstudiante,
            unidadesCurricularesAprobadas: {
              ...state.informacionEstudiante.unidadesCurricularesAprobadas,
              [unidadCurricular.nombre]: {
                ...state.informacionEstudiante.unidadesCurricularesAprobadas[
                  unidadCurricular.nombre
                ],
                tipoAprobacion: TIPO_APROBACION.CURSO,
              },
            },
            creditosTotales:
              state.informacionEstudiante.creditosTotales -
              unidadCurricular.creditos,
            [unidadCurricular.grupo]:
              state.informacionEstudiante[unidadCurricular.grupo] -
              unidadCurricular.creditos,
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
