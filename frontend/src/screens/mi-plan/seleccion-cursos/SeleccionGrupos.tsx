import { ErrorState, UnidadCurricularListSkeleton } from "@/components";
import { useUnidadesCurriculares } from "@/hooks";
import { GRUPO_VALUES, SEMESTRE_DE_DICTADO } from "@/models";
import { GrupoUcsList } from "./GrupoUcsList";

export const SeleccionGrupos = () => {
  const {
    data: unidadesCurriculares,
    isLoading,
    isError,
    isSuccess,
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

  if (isLoading) {
    return (
      <section className="w-full grid lg:grid-cols-3 gap-12">
        {Array.from({ length: 6 }).map((_, index) => (
          <UnidadCurricularListSkeleton key={index} />
        ))}
      </section>
    );
  }

  if (isError) {
    return <ErrorState className="lg:h-96" />;
  }

  return (
    <section className="w-full grid lg:grid-cols-3 gap-12">
      {isSuccess &&
        GRUPO_VALUES.map((grupo) => {
          const unidadesCurricularesGrupo = unidadesCurriculares.data.filter(
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
