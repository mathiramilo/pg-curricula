import { ScreenHeader, TotalProgress } from "@/components";
import { ScreenLayout } from "@/layouts";
import { ProgresoPorGrupo } from "./ProgresoPorGrupo";
import { UnidadesCurricularesAprobadas } from "./UnidadesCurricularesAprobadas";

export const ProgresoScreen = () => {
  return (
    <ScreenLayout>
      <ScreenHeader title="Progreso Completo">
        <TotalProgress />
      </ScreenHeader>

      <ProgresoPorGrupo />

      <UnidadesCurricularesAprobadas />
    </ScreenLayout>
  );
};
