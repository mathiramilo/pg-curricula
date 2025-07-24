import { QueryClient } from "react-query";
import { create } from "zustand";

import { getListadoUCsAleatorio, getListadoUCsInicial } from "@/api";
import { SEMESTRE_DE_DICTADO, TIPO_APROBACION } from "@/models";
import type {
  InformacionEstudiante,
  PlanCarrera,
  SemestreDeDictado,
  UnidadCurricular,
  UnidadCurricularAprobada,
} from "@/models";
import {
  initialInformacionEstudiante,
  useInformacionEstudianteStore,
} from "./useInformacionEstudianteStore";

const CREDITOS_POR_SEMESTRE_DEFAULT = "40";

interface MiPlanStore {
  informacionEstudiante: InformacionEstudiante;
  listadoUCs: UnidadCurricular[];
  creditos: string;
  semestreInicial: SemestreDeDictado;
  plan?: PlanCarrera;

  syncInformacionEstudiante: () => Promise<void>;
  generateRandomSelection: () => Promise<void>;

  hasUnidadCurricular: (codigo: UnidadCurricular["codigo"]) => boolean;
  addUnidadCurricular: (unidadCurricular: UnidadCurricularAprobada) => void;
  removeUnidadCurricular: (unidadCurricular: UnidadCurricularAprobada) => void;

  hasUCListado: (codigo: UnidadCurricular["codigo"]) => boolean;
  addUCToListado: (unidadCurricular: UnidadCurricular) => void;
  removeUCFromListado: (unidadCurricular: UnidadCurricular) => void;

  setCreditos: (creditos: string) => void;
  setSemestreInicial: (semestre: SemestreDeDictado) => void;
  setPlan: (plan: PlanCarrera) => void;
}

export const useMiPlanStore = create<MiPlanStore>((set, get) => ({
  informacionEstudiante: initialInformacionEstudiante,
  listadoUCs: [],
  creditos: CREDITOS_POR_SEMESTRE_DEFAULT,
  semestreInicial: SEMESTRE_DE_DICTADO.PRIMER_SEMESTRE,

  syncInformacionEstudiante: async () => {
    const queryClient = new QueryClient();

    set({
      informacionEstudiante:
        useInformacionEstudianteStore.getState().informacionEstudiante,
      listadoUCs: [],
    });

    const listadoUCsInicial = await queryClient.fetchQuery({
      queryFn: () => getListadoUCsInicial(get().informacionEstudiante),
    });

    for (const unidadCurricular of listadoUCsInicial) {
      if (!get().hasUnidadCurricular(unidadCurricular.codigo)) {
        get().addUCToListado(unidadCurricular);
        get().addUnidadCurricular(unidadCurricular);
      }
    }
  },
  generateRandomSelection: async () => {
    const queryClient = new QueryClient();

    const listadoUCsAleatorio = await queryClient.fetchQuery({
      queryFn: () => getListadoUCsAleatorio(get().informacionEstudiante),
    });

    for (const unidadCurricular of listadoUCsAleatorio) {
      if (!get().hasUnidadCurricular(unidadCurricular.codigo)) {
        get().addUCToListado(unidadCurricular);
        get().addUnidadCurricular(unidadCurricular);
      }
    }
  },

  hasUnidadCurricular: (codigo) =>
    Boolean(get().informacionEstudiante.unidadesCurricularesAprobadas[codigo]),
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
  removeUnidadCurricular: (unidadCurricular) => {
    return set((state) => {
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
    });
  },

  hasUCListado: (codigo) => get().listadoUCs.some((uc) => uc.codigo === codigo),
  addUCToListado: (unidadCurricular) =>
    set((state) => ({
      listadoUCs: [...state.listadoUCs, unidadCurricular],
    })),
  removeUCFromListado: (unidadCurricular) =>
    set((state) => ({
      listadoUCs: state.listadoUCs.filter(
        (uc) => uc.codigo !== unidadCurricular.codigo,
      ),
    })),

  setCreditos: (creditos: string) => set({ creditos }),
  setSemestreInicial: (semestre: SemestreDeDictado) =>
    set({ semestreInicial: semestre }),
  setPlan: (plan: PlanCarrera) => set({ plan }),
}));
