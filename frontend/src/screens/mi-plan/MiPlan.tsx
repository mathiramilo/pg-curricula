import { useEffect } from "react";

import { ScreenLayout } from "@/layouts";
import { useInformacionEstudianteStore, useMiPlanStore } from "@/store";
import { ContentMiPlan } from "./ContentMiPlan";
import { HeaderMiPlan } from "./HeaderMiPlan";

export const MiPlanScreen = () => {
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
      <HeaderMiPlan />
      <ContentMiPlan />
    </ScreenLayout>
  );
};
