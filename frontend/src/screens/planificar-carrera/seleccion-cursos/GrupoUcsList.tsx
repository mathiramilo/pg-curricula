import { useUnidadesCurricularesObligatorias } from "@/hooks";
import type { Grupo, UnidadCurricular } from "@/models";
import { REQUISITOS_TITULO } from "@/models";
import { useInformacionEstudianteStore, useMiPlanStore } from "@/store";
import { capitalizeWords, cn } from "@/utils";
import { UcCheckbox } from "./UcCheckbox";

interface GrupoUcsListProps {
  grupo: Grupo;
  unidadesCurriculares: UnidadCurricular[];
}

export const GrupoUcsList = ({
  grupo,
  unidadesCurriculares,
}: GrupoUcsListProps) => {
  const { informacionEstudiante, hasUnidadCurricular } = useMiPlanStore();

  const hasUnidadCurricularExamen = useInformacionEstudianteStore(
    (state) => state.hasUnidadCurricularExamen,
  );

  const { data: unidadesCurricularesObligatorias } =
    useUnidadesCurricularesObligatorias();

  const satisfaceRequisitos =
    informacionEstudiante[grupo] >= REQUISITOS_TITULO[grupo];

  // FILTER: si el curso ya fue aprobado con examen, no se muestra.
  // SORT: ordenamos las ucs para que las marcadas aparezcan primero.
  const sortedUnidadesCurriculares = unidadesCurriculares
    .filter((uc) => !hasUnidadCurricularExamen(uc))
    .sort((uc) => (hasUnidadCurricular(uc.codigo) ? -1 : 1));

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-medium">{capitalizeWords(grupo)}</h3>
        <span
          className={cn(
            "font-medium",
            satisfaceRequisitos ? "text-green-500" : "text-red-500",
          )}
        >
          {informacionEstudiante[grupo]}/{REQUISITOS_TITULO[grupo]}
        </span>
      </div>

      <div className="max-h-64 overflow-y-auto flex flex-col gap-1">
        {sortedUnidadesCurriculares.map((uc) => {
          const isObligatoria = Boolean(
            unidadesCurricularesObligatorias?.find(
              (ucObligatoria) => ucObligatoria.codigo === uc.codigo,
            ),
          );

          return (
            <UcCheckbox key={uc.codigo} uc={uc} isObligatoria={isObligatoria} />
          );
        })}
      </div>
    </section>
  );
};
