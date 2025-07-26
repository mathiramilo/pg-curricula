import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertTitle,
  AlertTriangleIcon,
  ArrowRightIcon,
  ArrowsShuffleIcon,
  Button,
  ErrorState,
  RestartIcon,
  TotalProgress,
  UnidadCurricularListSkeleton,
} from "@/components";
import { useSatisfaceRequisitos, useUnidadesCurriculares } from "@/hooks";
import { SEMESTRE_DE_DICTADO } from "@/models";
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

  const {
    data: unidadesCurriculares,
    isLoading,
    isError,
    isSuccess,
  } = useUnidadesCurriculares({
    filter: {
      semestresDeDictado: [
        SEMESTRE_DE_DICTADO.PRIMER_SEMESTRE,
        SEMESTRE_DE_DICTADO.SEGUNDO_SEMESTRE,
      ],
    },
    page: 1,
    pageSize: 1000,
  });

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

      {isLoading && (
        <section className="w-full grid lg:grid-cols-3 gap-12">
          {Array.from({ length: 6 }).map((_, index) => (
            <UnidadCurricularListSkeleton key={index} />
          ))}
        </section>
      )}

      {isError && <ErrorState className="lg:h-96" />}

      {isSuccess && (
        <>
          <SeleccionGrupos unidadesCurriculares={unidadesCurriculares.data} />

          <footer className="flex flex-col gap-4">
            {!satisfaceRequisitos && (
              <Alert
                variant="destructive"
                className="flex-col gap-3 lg:flex-row"
              >
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
        </>
      )}
    </section>
  );
};
