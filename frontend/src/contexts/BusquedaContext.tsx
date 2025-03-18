import type { PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";

import { useBoolean, useDebounce } from "@/hooks";

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
  setQuery: React.Dispatch<string>;
  setGrupo: React.Dispatch<React.SetStateAction<string>>;
  setRangoCreditos: React.Dispatch<number[]>;
  setSoloHabilitadas: React.Dispatch<React.SetStateAction<boolean>>;
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

  return (
    <BusquedaContext.Provider
      value={{
        query,
        debouncedQuery,
        grupo,
        rangoCreditos,
        debouncedRangoCreditos,
        soloHabilitadas,
        setQuery,
        setGrupo,
        setRangoCreditos,
        setSoloHabilitadas,
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
