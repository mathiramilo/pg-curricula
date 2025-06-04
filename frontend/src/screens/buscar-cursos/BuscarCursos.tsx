import { BusquedaContextProvider } from "@/contexts";
import { ScreenLayout } from "@/layouts";
import { ContentBuscarCursos } from "./ContentBuscarCursos";
import { HeaderBuscarCursos } from "./HeaderBuscarCursos";

export const BuscarCursosScreen = () => {
  return (
    <BusquedaContextProvider>
      <ScreenLayout>
        <HeaderBuscarCursos />
        <ContentBuscarCursos />
      </ScreenLayout>
    </BusquedaContextProvider>
  );
};
