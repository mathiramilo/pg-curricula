import { BusquedaContextProvider } from "@/contexts";
import { ScreenLayout } from "@/layouts";
import { HeaderBusqueda } from "./components";

export const BusquedaScreen = () => {
  return (
    <BusquedaContextProvider>
      <ScreenLayout>
        <HeaderBusqueda />
      </ScreenLayout>
    </BusquedaContextProvider>
  );
};
