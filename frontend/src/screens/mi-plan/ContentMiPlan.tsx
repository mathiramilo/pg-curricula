import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components";
import { PlanEstudios } from "./PlanEstudios";
import { SeleccionCursos } from "./SeleccionCursos";

export const ContentMiPlan = () => {
  return (
    <Tabs defaultValue="seleccion" className="lg:gap-8">
      <TabsList className="w-full max-w-xl mx-auto">
        <TabsTrigger value="seleccion">Selección de cursos</TabsTrigger>
        <TabsTrigger value="plan">Plan de estudios</TabsTrigger>
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
