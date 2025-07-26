import type { UnidadCurricular } from "@/models";
import { GRUPO_VALUES } from "@/models";
import { GrupoUcsList } from "./GrupoUcsList";

interface SeleccionGruposProps {
  unidadesCurriculares: UnidadCurricular[];
}

export const SeleccionGrupos = ({
  unidadesCurriculares,
}: SeleccionGruposProps) => {
  return (
    <section className="w-full grid lg:grid-cols-3 gap-12">
      {GRUPO_VALUES.map((grupo) => {
        const unidadesCurricularesGrupo = unidadesCurriculares.filter(
          (uc) => uc.nombreGrupoHijo === grupo,
        );

        return (
          <GrupoUcsList
            key={grupo}
            grupo={grupo}
            unidadesCurriculares={unidadesCurricularesGrupo}
          />
        );
      })}
    </section>
  );
};
