import { ScreenHeader, TotalProgress } from "@/components";
import { ScreenLayout } from "@/layouts";
import { ProgresoPorGrupo } from "./ProgresoPorGrupo";
import { UnidadesCurricularesAprobadas } from "./UnidadesCurricularesAprobadas";

export const ResumenCarreraScreen = () => {
  return (
    <ScreenLayout>
      <ScreenHeader
        title="Resumen de Carrera"
        description="Visualiza tu progreso en la carrera, incluyendo cantidad de créditos por grupo, unidades curriculares y más."
      >
        <TotalProgress />
      </ScreenHeader>

      <ProgresoPorGrupo />

      <UnidadesCurricularesAprobadas />
    </ScreenLayout>
  );
};
