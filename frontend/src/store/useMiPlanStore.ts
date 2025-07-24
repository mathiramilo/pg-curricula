import { create } from "zustand";
import { persist } from "zustand/middleware";

import { SEMESTRE_DE_DICTADO, TIPO_APROBACION } from "@/models";
import type {
  InformacionEstudiante,
  PlanCarrera,
  SemestreDeDictado,
  UnidadCurricular,
  UnidadCurricularAprobada,
} from "@/models";
import { initialInformacionEstudiante } from "./useInformacionEstudianteStore";

const CREDITOS_POR_SEMESTRE_DEFAULT = "40";

interface MiPlanStore {
  informacionEstudiante: InformacionEstudiante;
  listadoUCs: UnidadCurricular[];
  creditos: string;
  semestreInicial: SemestreDeDictado;
  plan?: PlanCarrera;

  hasUnidadCurricular: (codigo: UnidadCurricularAprobada) => boolean;
  addUnidadCurricular: (unidadCurricular: UnidadCurricularAprobada) => void;
  removeUnidadCurricular: (unidadCurricular: UnidadCurricularAprobada) => void;
  setCreditos: (creditos: string) => void;
  setSemestreInicial: (semestre: SemestreDeDictado) => void;
  setPlan: (plan: PlanCarrera) => void;
}

export const useMiPlanStore = create<MiPlanStore>()(
  persist(
    (set, get) => ({
      informacionEstudiante: initialInformacionEstudiante,
      listadoUCs: [],
      creditos: CREDITOS_POR_SEMESTRE_DEFAULT,
      semestreInicial: SEMESTRE_DE_DICTADO.PRIMER_SEMESTRE,

      hasUnidadCurricular: (unidadCurricular) =>
        Boolean(
          get().informacionEstudiante.unidadesCurricularesAprobadas[
            unidadCurricular.codigo
          ],
        ),
      addUnidadCurricular: (unidadCurricular) =>
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
      removeUnidadCurricular: (unidadCurricular) =>
        set((state) => {
          const updatedUCsAprobadas = Object.fromEntries(
            Object.entries(
              state.informacionEstudiante.unidadesCurricularesAprobadas,
            ).filter(([codigo]) => codigo !== unidadCurricular.codigo),
          );

          return {
            informacionEstudiante: {
              ...state.informacionEstudiante,
              unidadesCurricularesAprobadas: updatedUCsAprobadas,
              creditosTotales:
                state.informacionEstudiante.creditosTotales -
                unidadCurricular.creditos,
              [unidadCurricular.nombreGrupoHijo]:
                state.informacionEstudiante[unidadCurricular.nombreGrupoHijo] -
                unidadCurricular.creditos,
            },
          };
        }),
      setCreditos: (creditos: string) => set({ creditos }),
      setSemestreInicial: (semestre: SemestreDeDictado) =>
        set({ semestreInicial: semestre }),
      setPlan: (plan: PlanCarrera) => set({ plan }),
    }),
    {
      name: "mi-plan-store",
    },
  ),
);
