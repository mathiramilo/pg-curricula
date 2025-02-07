import type { UnidadCurricular } from "@/models";
import { UnidadCurricularItem } from "./UnidadCurricularItem";

interface UnidadCurricularListProps {
  unidadesCurriculares: UnidadCurricular[];
  titulo?: string;
}

export const UnidadCurricularList = ({
  unidadesCurriculares,
  titulo,
}: UnidadCurricularListProps) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {titulo && <h2 className="text-lg font-medium">{titulo}</h2>}
      <div className="w-full flex flex-col gap-2">
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
