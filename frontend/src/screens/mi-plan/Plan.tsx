import { EmptyState, ErrorState, UnidadCurricularList } from "@/components";
import { useSatisfaceRequisitos } from "@/hooks";
import { useInformacionEstudianteStore, useMiPlanStore } from "@/store";
import { TrayectoriaSugeridaLoading } from "../inicio/TrayectoriaSugeridaLoading";

interface PlanProps {
  isLoading: boolean;
  isError: boolean;
}

export const Plan = ({ isLoading, isError }: PlanProps) => {
  const plan = useMiPlanStore((state) => state.plan);

  const informacionEstudiante = useInformacionEstudianteStore(
    (state) => state.informacionEstudiante,
  );

  const { satisfaceRequisitos } = useSatisfaceRequisitos(informacionEstudiante);

  if (satisfaceRequisitos) {
    return (
      <div className="h-1/3 flex items-center justify-center p-8">
        <div className="flex flex-col items-center justify-center gap-6">
          <img
            src="/images/party-popper.png"
            alt="Ilustracion de Confeti"
            className="w-28"
          />
          <p className="text-fuente-secundario w-2/3 font-light text-sm text-center">
            ¡Felicidades! Has alcanzado los créditos necesarios para solicitar
            tu título. Por lo tanto, no es necesario generar un plan de carrera.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <TrayectoriaSugeridaLoading />;
  }

  if (isError) {
    return <ErrorState className="mt-8" />;
  }

  if (!plan?.length) {
    return (
      <EmptyState message='Selecciona la cantidad de créditos por semestre y clickea en "Generar Plan" para poder visualizar tu plan personalizado' />
    );
  }

  return (
    <section className="grid gap-8 lg:gap-12 lg:grid-cols-3">
      {plan.map(({ semestre, unidadesCurriculares, creditos, label }) => {
        return (
          <UnidadCurricularList
            key={semestre}
            unidadesCurriculares={unidadesCurriculares}
            titulo={`${label} (${creditos} créditos)`}
            type="creditos"
          />
        );
      })}
    </section>
  );
};
