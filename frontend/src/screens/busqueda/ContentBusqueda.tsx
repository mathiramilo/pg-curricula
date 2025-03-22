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

export const ContentBusqueda = () => {
  const {
    debouncedQuery,
    grupo,
    debouncedRangoCreditos,
    soloHabilitadas,
    semestresDeDictado,
  } = useBusquedaContext();

  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useUnidadesCurriculares(
    {
      nombre: debouncedQuery,
      grupo,
      minCreditos: debouncedRangoCreditos[0],
      maxCreditos: debouncedRangoCreditos[1],
      habilitadas: soloHabilitadas,
      semestresDeDictado,
    },
    page,
  );

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
    return <UnidadCurricularGridSkeleton itemsAmount={60} className="mt-8" />;
  }

  if (isError) {
    return <ErrorState className="mt-8" />;
  }

  if (!data?.data.length) {
    return <EmptyState className="mt-8" />;
  }

  const {
    data: unidadesCurriculares,
    page: currentPage,
    pageSize,
    totalItems,
  } = data;

  return (
    <MemoizedUnidadCurricularGrid
      titulo="Resultados"
      unidadesCurriculares={unidadesCurriculares}
      className="mt-8"
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
