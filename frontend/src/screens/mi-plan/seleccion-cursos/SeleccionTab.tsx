import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertTitle,
  AlertTriangleIcon,
  ArrowRightIcon,
  ArrowsShuffleIcon,
  Button,
  RestartIcon,
  TotalProgress,
} from "@/components";
import { useSatisfaceRequisitos } from "@/hooks";
import { useMiPlanStore } from "@/store";
import { SeleccionGrupos } from "./SeleccionGrupos";

interface SeleccionTabProps {
  onNavigateToPlan: () => void;
}

export const SeleccionTab = ({ onNavigateToPlan }: SeleccionTabProps) => {
  const {
    informacionEstudiante,
    syncInformacionEstudiante,
    generateRandomSelection,
  } = useMiPlanStore();

  const { satisfaceRequisitos, errors } = useSatisfaceRequisitos(
    informacionEstudiante,
  );

  return (
    <section className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
          <h2 className="text-xl font-medium">Selección de cursos</h2>

          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 gap-2">
            <Button
              variant="outline"
              disabled={satisfaceRequisitos}
              onClick={() => void generateRandomSelection()}
            >
              <ArrowsShuffleIcon />
              <span>Completar selección</span>
            </Button>

            <Button
              variant="destructive"
              onClick={() => void syncInformacionEstudiante()}
            >
              <RestartIcon />
              <span>Reiniciar selección</span>
            </Button>
          </div>
        </div>

        <TotalProgress creditos={informacionEstudiante.creditosTotales} />
      </header>

      <SeleccionGrupos />

      <footer className="flex flex-col gap-4">
        {!satisfaceRequisitos && (
          <Alert variant="destructive" className="flex-col gap-3 lg:flex-row">
            <div className="flex gap-2 grow">
              <AlertTriangleIcon className="shrink-0 size-4 translate-y-0.5" />
              <AlertContent>
                <AlertTitle>
                  Aún no has alcanzado los requisitos necesarios
                </AlertTitle>
                <AlertDescription>
                  <ul className="list-inside list-disc">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </AlertContent>
            </div>

            <Button
              variant="outline"
              disabled={satisfaceRequisitos}
              onClick={() => void generateRandomSelection()}
              className="self-center w-full lg:w-auto"
            >
              <ArrowsShuffleIcon />
              <span>Completar selección</span>
            </Button>
          </Alert>
        )}

        <Button
          disabled={!satisfaceRequisitos}
          onClick={onNavigateToPlan}
          className="w-full lg:w-auto lg:self-end"
        >
          Ir a plan de estudios
          <ArrowRightIcon />
        </Button>
      </footer>
    </section>
  );
};
