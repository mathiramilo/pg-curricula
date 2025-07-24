import { Button, RestartIcon, SchoolIcon, TotalProgress } from "@/components";
import { useMiPlanStore } from "@/store";
import { SeleccionPorGrupos } from "./SeleccionPorGrupos";

export const SeleccionCursos = () => {
  const creditosTotales = useMiPlanStore(
    (state) => state.informacionEstudiante.creditosTotales,
  );

  return (
    <section className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
          <h2 className="text-xl font-medium">Selección de cursos</h2>

          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 gap-2">
            <Button
              onClick={() => console.log("Generar selección al azar")}
              variant="outline"
            >
              <SchoolIcon />
              <span>Generar selección al azar</span>
            </Button>

            <Button variant="destructive">
              <RestartIcon />
              <span>Reiniciar selección</span>
            </Button>
          </div>
        </div>

        <TotalProgress creditos={creditosTotales} />
      </header>

      <SeleccionPorGrupos />
    </section>
  );
};
