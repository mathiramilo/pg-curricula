import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components";
import { useSatisfaceRequisitos } from "@/hooks";
import { useMiPlanStore } from "@/store";
import { PlanEstudios } from "./PlanEstudios";
import { SeleccionCursos } from "./SeleccionCursos";

export const ContentMiPlan = () => {
  const informacionEstudiante = useMiPlanStore(
    (state) => state.informacionEstudiante,
  );

  const { satisfaceRequisitos } = useSatisfaceRequisitos(informacionEstudiante);

  return (
    <Tabs defaultValue="seleccion" className="lg:gap-8">
      <TabsList className="w-full max-w-xl mx-auto">
        <TabsTrigger value="seleccion">Selección de cursos</TabsTrigger>
        <TabsTrigger value="plan" disabled={!satisfaceRequisitos}>
          Plan de estudios
        </TabsTrigger>
      </TabsList>

      <TabsContent value="seleccion">
        <SeleccionCursos />
      </TabsContent>
      <TabsContent value="plan">
        <PlanEstudios />
      </TabsContent>
    </Tabs>
  );
};
