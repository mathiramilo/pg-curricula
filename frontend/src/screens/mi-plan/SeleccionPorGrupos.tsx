import { useEffect } from "react";

import {
  MemoizedUnidadCurricularItem,
  UnidadCurricularGridSkeleton,
} from "@/components";
import {
  useUnidadesCurriculares,
  useUnidadesCurricularesObligatorias,
} from "@/hooks";
import { GRUPO_VALUES, REQUISITOS_TITULO, SEMESTRE_DE_DICTADO } from "@/models";
import { useInformacionEstudianteStore, useMiPlanStore } from "@/store";
import { capitalizeWords, cn } from "@/utils";

export const SeleccionPorGrupos = () => {
  const {
    informacionEstudiante,
    hasUnidadCurricular,
    addUnidadCurricular,
    removeUnidadCurricular,
  } = useMiPlanStore();

  const unidadesCurricularesAprobadas = useInformacionEstudianteStore(
    (state) => state.informacionEstudiante.unidadesCurricularesAprobadas,
  );

  const {
    data: unidadesCurricularesObligatorias,
    isLoading: isLoadingUCsObligatorias,
    isError: isErrorUCsObligatorias,
  } = useUnidadesCurricularesObligatorias();

  const {
    data: unidadesCurriculares,
    isLoading: isLoadingUCs,
    isError: isErrorUCs,
  } = useUnidadesCurriculares({
    filter: {
      semestresDeDictado: [
        SEMESTRE_DE_DICTADO.PRIMER_SEMESTRE,
        SEMESTRE_DE_DICTADO.SEGUNDO_SEMESTRE,
      ],
    },
    page: 1,
    pageSize: 1000,
  });

  useEffect(() => {
    unidadesCurricularesObligatorias?.forEach((uc) => {
      if (!hasUnidadCurricular(uc)) {
        addUnidadCurricular(uc);
      }
    });
    Object.values(unidadesCurricularesAprobadas).forEach((uc) => {
      if (!hasUnidadCurricular(uc)) {
        addUnidadCurricular(uc);
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isLoading = isLoadingUCs || isLoadingUCsObligatorias;
  const isError = isErrorUCs || isErrorUCsObligatorias;

  if (isLoading) {
    return <UnidadCurricularGridSkeleton itemsAmount={30} />;
  }

  if (isError) {
    return null; // TODO: Handle error state appropriately
  }

  return (
    <section className="w-full grid lg:grid-cols-3 gap-12">
      {GRUPO_VALUES.map((grupo) => {
        const unidadesCurricularesGrupo = unidadesCurriculares?.data.filter(
          (uc) => uc.nombreGrupoHijo === grupo,
        );
        const satisfaceRequisitos =
          informacionEstudiante[grupo] >= REQUISITOS_TITULO[grupo];

        return (
          <section key={grupo} className="flex flex-col gap-4">
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
              {unidadesCurricularesGrupo
                ?.sort((uc) => (hasUnidadCurricular(uc) ? -1 : 1))
                .map((uc) => {
                  const selected = hasUnidadCurricular(uc);
                  const onSelectedChange = (value: boolean) => {
                    if (value) {
                      addUnidadCurricular(uc);
                    } else {
                      removeUnidadCurricular(uc);
                    }
                  };
                  const disabled = false;

                  return (
                    <MemoizedUnidadCurricularItem
                      key={uc.codigo}
                      unidadCurricular={uc}
                      type="seleccion"
                      selected={selected}
                      onSelectedChange={onSelectedChange}
                      selectionDisabled={disabled}
                    />
                  );
                })}
            </div>
          </section>
        );
      })}
    </section>
  );
};
