import { useParams } from "react-router-dom";

import { ScreenHeader, Switch, UnidadCurricularGrid } from "@/components";
import { ScreenLayout } from "@/layouts";
import { capitalizeWords } from "@/utils";
import { unidadesCurriculares } from "./inicio/mock";

export const GrupoScreen = () => {
  const { slug } = useParams();

  const title = capitalizeWords(slug ?? "");

  return (
    <ScreenLayout className="flex flex-col gap-8">
      <ScreenHeader title={title}>
        <div className="flex items-center gap-2">
          <Switch />
          <p className="text-sm">Mostrar solamente habilitadas a cursar</p>
        </div>
      </ScreenHeader>

      <UnidadCurricularGrid
        titulo="Listado de unidades curriculares"
        unidadesCurriculares={[
          ...unidadesCurriculares,
          ...unidadesCurriculares,
          ...unidadesCurriculares,
          ...unidadesCurriculares,
        ]}
      />
    </ScreenLayout>
  );
};
