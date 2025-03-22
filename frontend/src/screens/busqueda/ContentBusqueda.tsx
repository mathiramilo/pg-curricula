import {
  EmptyState,
  ErrorState,
  MemoizedUnidadCurricularGrid,
  UnidadCurricularGridSkeleton,
} from "@/components";
import { useBusquedaContext } from "@/contexts";
import { useUnidadesCurriculares } from "@/hooks";

export const ContentBusqueda = () => {
  const {
    debouncedQuery,
    grupo,
    debouncedRangoCreditos,
    soloHabilitadas,
    semestresDeDictado,
  } = useBusquedaContext();

  const {
    data: unidadesCurriculares,
    isLoading,
    isError,
  } = useUnidadesCurriculares({
    nombre: debouncedQuery,
    grupo,
    minCreditos: debouncedRangoCreditos[0],
    maxCreditos: debouncedRangoCreditos[1],
    habilitadas: soloHabilitadas,
    semestresDeDictado,
  });

  if (isLoading) {
    return <UnidadCurricularGridSkeleton itemsAmount={78} className="mt-8" />;
  }

  if (isError) {
    return <ErrorState className="mt-8" />;
  }

  if (!unidadesCurriculares?.length) {
    return <EmptyState className="mt-8" />;
  }

  return (
    <MemoizedUnidadCurricularGrid
      titulo="Resultados"
      unidadesCurriculares={unidadesCurriculares}
      className="mt-8"
    />
  );
};
