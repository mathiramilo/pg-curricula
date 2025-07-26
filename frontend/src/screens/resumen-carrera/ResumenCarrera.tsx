import { ScreenHeader, TotalProgress } from "@/components";
import { ScreenLayout } from "@/layouts";
import { useInformacionEstudianteStore } from "@/store";
import { ModulosTallerExtension } from "./ModulosTallerExtension";
import { ProgresoPorGrupo } from "./ProgresoPorGrupo";
import { UnidadesCurricularesAprobadas } from "./UnidadesCurricularesAprobadas";

export const ResumenCarreraScreen = () => {
  const creditosTotales = useInformacionEstudianteStore(
    (state) => state.informacionEstudiante.creditosTotales,
  );

  return (
    <ScreenLayout>
      <ScreenHeader
        title="Resumen Carrera"
        description="Visualiza tu progreso en la carrera, incluyendo cantidad de créditos por grupo, unidades curriculares y más."
      >
        <TotalProgress creditos={creditosTotales} />
      </ScreenHeader>

      <ProgresoPorGrupo />
      <ModulosTallerExtension />
      <UnidadesCurricularesAprobadas />
    </ScreenLayout>
  );
};
