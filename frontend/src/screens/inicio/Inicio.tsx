import { ScreenLayout } from "@/layouts";
import { HeaderInicio, TrayectoriaSugerida } from "./components";

export const InicioScreen = () => {
  return (
    <ScreenLayout>
      <HeaderInicio />

      <TrayectoriaSugerida />
    </ScreenLayout>
  );
};
