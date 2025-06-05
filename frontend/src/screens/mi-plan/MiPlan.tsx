import { toast } from "sonner";

import { AlertTriangleIcon, ConfettiIcon } from "@/components";
import { useGeneratePlan } from "@/hooks";
import { ScreenLayout } from "@/layouts";
import { useMiPlanStore } from "@/store";
import { ContentMiPlan } from "./ContentMiPlan";
import { HeaderMiPlan } from "./HeaderMiPlan";

export const MiPlanScreen = () => {
  const { creditos, semestreInicial, setPlan } = useMiPlanStore();

  const { mutate, isLoading, isError } = useGeneratePlan();

  const handleGenerate = () => {
    mutate(
      {
        creditosPorSemestre: Number(creditos),
        semestreInicial,
      },
      {
        onError: () => {
          toast.error("Ha ocurrido un error al generar tu plan", {
            icon: <AlertTriangleIcon className="size-5" />,
            description: "Por favor intenta nuevamente en unos minutos.",
          });
        },
        onSuccess: (data) => {
          setPlan(data);

          toast.success("Tu plan ha sido generado con éxito", {
            icon: <ConfettiIcon className="size-5" />,
            description: "Ahora puedes explorarlo y descargarlo!",
          });
        },
      },
    );
  };

  return (
    <ScreenLayout>
      <HeaderMiPlan onGenerate={handleGenerate} />
      <ContentMiPlan isLoading={isLoading} isError={isError} />
    </ScreenLayout>
  );
};
