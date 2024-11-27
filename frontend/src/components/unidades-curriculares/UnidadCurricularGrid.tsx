import type { UnidadCurricular } from "@/types";
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
      <div className="w-full grid grid-cols-3 gap-x-12 gap-y-2">
        {unidadesCurriculares.map(
          ({ codigo, nombre, cursoAprobado, examenAprobado }) => (
            <UnidadCurricularItem
              key={codigo}
              codigo={codigo}
              nombre={nombre}
              cursoAprobado={cursoAprobado}
              examenAprobado={examenAprobado}
            />
          ),
        )}
      </div>
    </div>
  );
};
