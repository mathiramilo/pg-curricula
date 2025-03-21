import { BusquedaContextProvider } from "@/contexts";
import { ScreenLayout } from "@/layouts";
import { ContentBusqueda } from "./ContentBusqueda";
import { HeaderBusqueda } from "./HeaderBusqueda";

export const BusquedaScreen = () => {
  return (
    <BusquedaContextProvider>
      <ScreenLayout>
        <HeaderBusqueda />
        <ContentBusqueda />
      </ScreenLayout>
    </BusquedaContextProvider>
  );
};
