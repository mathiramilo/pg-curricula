import { useEffect, useState } from "react";

import {
  EmptyState,
  ErrorState,
  MemoizedUnidadCurricularGrid,
  Pagination,
  UnidadCurricularGridSkeleton,
} from "@/components";
import { useBusquedaContext } from "@/contexts";
import { useUnidadesCurriculares } from "@/hooks";

export const ContentBuscarCursos = () => {
  const {
    debouncedQuery,
    grupo,
    debouncedRangoCreditos,
    soloHabilitadas,
    semestresDeDictado,
  } = useBusquedaContext();

  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useUnidadesCurriculares({
    filter: {
      search: debouncedQuery,
      grupo,
      minCreditos: debouncedRangoCreditos[0],
      maxCreditos: debouncedRangoCreditos[1],
      habilitadas: soloHabilitadas,
      semestresDeDictado,
    },
    page,
  });

  useEffect(() => {
    setPage(1);
  }, [
    debouncedQuery,
    grupo,
    debouncedRangoCreditos,
    soloHabilitadas,
    semestresDeDictado,
  ]);

  if (isLoading) {
    return <UnidadCurricularGridSkeleton itemsAmount={60} />;
  }

  if (isError) {
    return <ErrorState />;
  }

  if (!data?.data.length) {
    return <EmptyState />;
  }

  const {
    data: unidadesCurriculares,
    page: currentPage,
    pageSize,
    totalItems,
  } = data;

  return (
    <MemoizedUnidadCurricularGrid
      titulo="Resultados de la búsqueda"
      unidadesCurriculares={unidadesCurriculares}
      rightElement={
        <Pagination
          page={currentPage}
          pageSize={pageSize}
          totalItems={totalItems}
          previous={() => setPage((prev) => prev - 1)}
          next={() => setPage((prev) => prev + 1)}
        />
      }
    />
  );
};
