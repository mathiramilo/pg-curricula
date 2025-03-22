import { ComingSoon, ScreenHeader } from "@/components";
import { ScreenLayout } from "@/layouts";

export const TrayectoriaScreen = () => {
  return (
    <ScreenLayout>
      <ScreenHeader title="Planificar Trayectoria"></ScreenHeader>
      <ComingSoon message="Proximamente podrás obtener una trayectoria sugerida para recibirte en el tiempo que desees." />
    </ScreenLayout>
  );
};
