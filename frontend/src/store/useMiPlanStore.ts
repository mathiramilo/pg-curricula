import { create } from "zustand";
import { persist } from "zustand/middleware";

import { SEMESTRE_DE_DICTADO } from "@/models";
import type { PlanCarrera, SemestreDeDictado } from "@/models";

const CREDITOS_POR_SEMESTRE_DEFAULT = "40";

interface MiPlanStore {
  creditos: string;
  semestreInicial: SemestreDeDictado;
  plan?: PlanCarrera;

  setCreditos: (creditos: string) => void;
  setSemestreInicial: (semestre: SemestreDeDictado) => void;
  setPlan: (plan: PlanCarrera) => void;
}

export const useMiPlanStore = create<MiPlanStore>()(
  persist(
    (set) => ({
      creditos: CREDITOS_POR_SEMESTRE_DEFAULT,
      semestreInicial: SEMESTRE_DE_DICTADO.PRIMER_SEMESTRE,

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
