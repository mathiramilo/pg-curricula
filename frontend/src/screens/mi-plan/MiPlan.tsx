import { toast } from "sonner";
import { useState } from "react";
import { AlertTriangleIcon, ConfettiIcon } from "@/components";
import { useGeneratePlan, useListadoUcsAleatorio } from "@/hooks";
import { ScreenLayout } from "@/layouts";
import { useMiPlanStore } from "@/store";
import { ContentMiPlan } from "./ContentMiPlan";
import { HeaderMiPlan } from "./HeaderMiPlan";
import { SeleccionarCursos } from "./SeleccionarCursos";

export const MiPlanScreen = () => {
  const { creditos, semestreInicial, setPlan } = useMiPlanStore();

  const { mutate, isLoading, isError } = useGeneratePlan();

  const {data: listadoUcsAleatorio} = useListadoUcsAleatorio(); //PARA MI NO TIENE SENTIDO ESTO, Q SE HAGA DIRECTO EN BACK

  const [activeView, setActiveView] = useState("plan-estudios");

  const handleGenerate = () => {
    if (!listadoUcsAleatorio || listadoUcsAleatorio.length === 0) {
      toast.error("No se pudo obtener el listado de cursos", {
        icon: <AlertTriangleIcon className="size-5" />,
        description: "Asegurate de haber seleccionado los cursos correctamente.",
      });
      return;
    }
    mutate(
      {
        creditosPorSemestre: Number(creditos),
        semestreInicial,
        listadoUCs: listadoUcsAleatorio || [],
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
      <HeaderMiPlan 
        onGenerate={handleGenerate}
        activeView={activeView}
        onViewChange={setActiveView}
      />
      {activeView === "plan-estudios" ? (
        <ContentMiPlan isLoading={isLoading} isError={isError} />
      ) : (
        <SeleccionarCursos />
      )}
    </ScreenLayout>
  );
};
