import type { UnidadCurricular } from "@/models";
import { UnidadCurricularItem } from "./UnidadCurricularItem";

interface UnidadCurricularGridProps {
  unidadesCurriculares: UnidadCurricular[];
  titulo?: string;
}

export const UnidadCurricularGrid = ({
  unidadesCurriculares,
  titulo,
}: UnidadCurricularGridProps) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {titulo && <h2 className="text-lg font-medium">{titulo}</h2>}
      <div className="w-full grid lg:grid-cols-3 gap-x-12 gap-y-2">
        {unidadesCurriculares.map((unidadCurricular) => (
          <UnidadCurricularItem
            key={unidadCurricular.codigo}
            unidadCurricular={unidadCurricular}
          />
        ))}
      </div>
    </div>
  );
};
