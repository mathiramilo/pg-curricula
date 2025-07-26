import { ErrorState, UnidadCurricularList } from "@/components";
import { TrayectoriaSugeridaLoading } from "@/screens/inicio/TrayectoriaSugeridaLoading";
import { useMiPlanStore } from "@/store";

interface PlanDisplayProps {
  isPending: boolean;
  isError: boolean;
}

export const PlanDisplay = ({ isPending, isError }: PlanDisplayProps) => {
  const plan = useMiPlanStore((state) => state.plan);

  if (isPending) {
    return <TrayectoriaSugeridaLoading />;
  }

  if (isError) {
    return <ErrorState className="mt-8" />;
  }

  if (!plan?.length) {
    return (
      <div className="h-1/3 flex items-center justify-center py-8 lg:h-96">
        <div className="flex flex-col items-center justify-center gap-2">
          <img
            src="/images/plan-illustration.png"
            alt="Ilustracion de Confeti"
            className="w-96"
          />
          <p className="text-fuente-secundario sm:w-2/3 font-light text-sm text-center">
            Selecciona la cantidad de créditos por semestre, semestre de inicio
            y clickea en &quot;Generar Plan&quot; para armar tu plan de estudios
            personalizado
          </p>
        </div>
      </div>
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
