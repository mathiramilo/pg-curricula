import { ScreenLayout } from "@/layouts";
import { HeaderInicio } from "./HeaderInicio";
import { TrayectoriaSugerida } from "./TrayectoriaSugerida";

export const InicioScreen = () => {
  return (
    <ScreenLayout>
      <HeaderInicio />
      <TrayectoriaSugerida />
    </ScreenLayout>
  );
};
