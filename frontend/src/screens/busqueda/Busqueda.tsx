import { BusquedaContextProvider } from "@/contexts";
import { ScreenLayout } from "@/layouts";
import { ContentBusqueda, HeaderBusqueda } from "./components";

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
