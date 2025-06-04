import { useState } from "react";

import {
  MemoizedUnidadCurricularGrid,
  Pagination,
  UnidadCurricularGridSkeleton,
} from "@/components";
import { useUnidadesCurriculares } from "@/hooks";

export const UnidadesCurricularesAprobadas = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isSuccess } = useUnidadesCurriculares(
    { aprobadas: true },
    page,
  );

  if (isLoading) {
    return <UnidadCurricularGridSkeleton itemsAmount={60} />;
  }

  if (isError) {
    return null;
  }

  if (isSuccess && data.data.length > 0) {
    return (
      <MemoizedUnidadCurricularGrid
        titulo="Cursos aprobados"
        unidadesCurriculares={data.data}
        rightElement={
          <Pagination
            page={data.page}
            pageSize={data.pageSize}
            totalItems={data.totalItems}
            previous={() => setPage((prev) => prev - 1)}
            next={() => setPage((prev) => prev + 1)}
          />
        }
      />
    );
  }
};
