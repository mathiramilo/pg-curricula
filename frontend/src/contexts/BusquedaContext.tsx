import type { PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";

import { useBoolean } from "@/hooks";

export const MIN_CREDITOS = 0;
export const MAX_CREDITOS = 30;
const RANGO_INICIAL = [MIN_CREDITOS, MAX_CREDITOS];

interface BusquedaContextType {
  query: string;
  grupo: string;
  rangoCreditos: number[];
  soloHabilitadas: boolean;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setGrupo: React.Dispatch<React.SetStateAction<string>>;
  setRangoCreditos: React.Dispatch<React.SetStateAction<number[]>>;
  setSoloHabilitadas: React.Dispatch<React.SetStateAction<boolean>>;
}

const BusquedaContext = createContext<BusquedaContextType | undefined>(
  undefined,
);

export const BusquedaContextProvider = ({ children }: PropsWithChildren) => {
  const [query, setQuery] = useState("");
  const [grupo, setGrupo] = useState("");
  const [rangoCreditos, setRangoCreditos] = useState(RANGO_INICIAL);
  const { value: soloHabilitadas, setValue: setSoloHabilitadas } =
    useBoolean(false);

  return (
    <BusquedaContext.Provider
      value={{
        query,
        grupo,
        rangoCreditos,
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
