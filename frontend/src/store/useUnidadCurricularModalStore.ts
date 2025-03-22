import { create } from "zustand";

import type { UnidadCurricular } from "@/models";

export interface UnidadCurricularModalStore {
  unidadCurricular?: UnidadCurricular;
  show: boolean;
  open: () => void;
  close: () => void;
  setUnidadCurricular: (unidadCurricular: UnidadCurricular) => void;
}

export const useUnidadCurricularModalStore = create<UnidadCurricularModalStore>(
  (set) => ({
    show: false,
    open: () => set({ show: true }),
    close: () => set({ show: false }),
    setUnidadCurricular: (unidadCurricular) => set({ unidadCurricular }),
  }),
);
