import type { PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";

import { useBoolean, useDebounce } from "@/hooks";
import type { SemestreDeDictado } from "@/models";

export const MIN_CREDITOS = 0;
export const MAX_CREDITOS = 30;
const RANGO_INICIAL = [MIN_CREDITOS, MAX_CREDITOS];

interface BusquedaContextType {
  query: string;
  debouncedQuery: string;
  grupo: string;
  rangoCreditos: number[];
  debouncedRangoCreditos: number[];
  soloHabilitadas: boolean;
  semestresDeDictado: SemestreDeDictado[];
  setQuery: React.Dispatch<string>;
  setGrupo: React.Dispatch<React.SetStateAction<string>>;
  setRangoCreditos: React.Dispatch<number[]>;
  setSoloHabilitadas: React.Dispatch<React.SetStateAction<boolean>>;
  setSemestresDeDictado: React.Dispatch<
    React.SetStateAction<SemestreDeDictado[]>
  >;
  clearFilters: () => void;
}

const BusquedaContext = createContext<BusquedaContextType | undefined>(
  undefined,
);

export const BusquedaContextProvider = ({ children }: PropsWithChildren) => {
  const [debouncedQuery, query, setQuery] = useDebounce("", 500);
  const [grupo, setGrupo] = useState("");
  const [debouncedRangoCreditos, rangoCreditos, setRangoCreditos] = useDebounce(
    RANGO_INICIAL,
    500,
  );
  const { value: soloHabilitadas, setValue: setSoloHabilitadas } =
    useBoolean(false);
  const [semestresDeDictado, setSemestresDeDictado] = useState<
    SemestreDeDictado[]
  >([]);

  const clearFilters = () => {
    setQuery("");
    setGrupo("");
    setRangoCreditos(RANGO_INICIAL);
    setSoloHabilitadas(false);
    setSemestresDeDictado([]);
  };

  return (
    <BusquedaContext.Provider
      value={{
        query,
        debouncedQuery,
        grupo,
        rangoCreditos,
        debouncedRangoCreditos,
        soloHabilitadas,
        semestresDeDictado,
        setQuery,
        setGrupo,
        setRangoCreditos,
        setSoloHabilitadas,
        setSemestresDeDictado,
        clearFilters,
      }}
    >
      {children}
    </BusquedaContext.Provider>
  );
};

export const useBusquedaContext = () => {
  const context = useContext(BusquedaContext);

  if (!context) {
    throw new Error(
      "useBusquedaContext debe ser usado dentro de BusquedaContextProvider",
    );
  }

  return context;
};
