import { Button, RestartIcon, SchoolIcon, TotalProgress } from "@/components";
import { useMiPlanStore } from "@/store";
import { SeleccionPorGrupos } from "./SeleccionPorGrupos";

export const SeleccionCursos = () => {
  const {
    informacionEstudiante,
    syncInformacionEstudiante,
    generateRandomSelection,
  } = useMiPlanStore();

  return (
    <section className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
          <h2 className="text-xl font-medium">Selección de cursos</h2>

          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 gap-2">
            <Button
              onClick={() => void generateRandomSelection()}
              variant="outline"
            >
              <SchoolIcon />
              <span>Generar selección al azar</span>
            </Button>

            <Button
              onClick={() => void syncInformacionEstudiante()}
              variant="destructive"
            >
              <RestartIcon />
              <span>Reiniciar selección</span>
            </Button>
          </div>
        </div>

        <TotalProgress creditos={informacionEstudiante.creditosTotales} />
      </header>

      <SeleccionPorGrupos />
    </section>
  );
};
