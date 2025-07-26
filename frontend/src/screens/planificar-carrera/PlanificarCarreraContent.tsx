import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components";
import { useSatisfaceRequisitos } from "@/hooks";
import { useInformacionEstudianteStore, useMiPlanStore } from "@/store";
import { PlanTab } from "./generar-plan";
import { SeleccionTab } from "./seleccion-cursos";

const TAB_VALUE = {
  SELECCION: "seleccion",
  PLAN: "plan",
} as const;
type TabValue = (typeof TAB_VALUE)[keyof typeof TAB_VALUE];

export const PlanificarCarreraContent = () => {
  const [tab, setTab] = useState<TabValue>(TAB_VALUE.SELECCION);

  const informacionEstudiante = useInformacionEstudianteStore(
    (state) => state.informacionEstudiante,
  );
  const informacionEstudianteMiPlan = useMiPlanStore(
    (state) => state.informacionEstudiante,
  );

  const { satisfaceRequisitos } = useSatisfaceRequisitos(informacionEstudiante);

  const { satisfaceRequisitos: satisfaceRequisitosMiPlan } =
    useSatisfaceRequisitos(informacionEstudianteMiPlan);

  if (satisfaceRequisitos) {
    return (
      <div className="h-1/3 flex items-center justify-center py-8 my-20 lg:h-96">
        <div className="flex flex-col items-center justify-center">
          <img
            src="/images/completed-illustration.png"
            alt="Ilustracion de Confeti"
            className="w-80"
          />
          <p className="text-fuente-secundario sm:w-2/3 font-light text-sm text-center">
            ¡Felicidades! Has alcanzado los créditos necesarios para solicitar
            tu título. Por lo tanto, no es necesario generar un plan de carrera.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Tabs
      value={tab}
      onValueChange={(value) => setTab(value as TabValue)}
      className="lg:gap-8"
    >
      <TabsList className="w-full max-w-xl mx-auto">
        <TabsTrigger value={TAB_VALUE.SELECCION}>
          Selección de cursos
        </TabsTrigger>
        <TabsTrigger
          value={TAB_VALUE.PLAN}
          disabled={!satisfaceRequisitosMiPlan}
        >
          Plan de estudios
        </TabsTrigger>
      </TabsList>

      <TabsContent value={TAB_VALUE.SELECCION}>
        <SeleccionTab onNavigateToPlan={() => setTab(TAB_VALUE.PLAN)} />
      </TabsContent>
      <TabsContent value={TAB_VALUE.PLAN}>
        <PlanTab />
      </TabsContent>
    </Tabs>
  );
};
