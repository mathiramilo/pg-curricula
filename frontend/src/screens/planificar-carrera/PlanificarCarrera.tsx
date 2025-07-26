import { useEffect } from "react";

import { ScreenLayout } from "@/layouts";
import { useInformacionEstudianteStore, useMiPlanStore } from "@/store";
import { PlanificarCarreraContent } from "./PlanificarCarreraContent";
import { PlanificarCarreraHeader } from "./PlanificarCarreraHeader";

export const PlanificarCarreraScreen = () => {
  const informacionEstudiante = useInformacionEstudianteStore(
    (state) => state.informacionEstudiante,
  );

  const syncInformacionEstudiante = useMiPlanStore(
    (state) => state.syncInformacionEstudiante,
  );

  useEffect(() => {
    void syncInformacionEstudiante();
  }, [syncInformacionEstudiante, informacionEstudiante]);

  return (
    <ScreenLayout>
      <PlanificarCarreraHeader />
      <PlanificarCarreraContent />
    </ScreenLayout>
  );
};
