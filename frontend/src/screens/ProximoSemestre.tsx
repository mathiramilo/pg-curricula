import { useState } from "react";

import {
  EmptyState,
  ErrorState,
  MemoizedUnidadCurricularGrid,
  Pagination,
  ScreenHeader,
  SwitchField,
  UnidadCurricularGridSkeleton,
} from "@/components";
import { useBoolean, useUnidadesCurriculares } from "@/hooks";
import { ScreenLayout } from "@/layouts";
import { obtenerSemestreActual } from "@/utils";

export const ProximoSemestreScreen = () => {
  const { value: soloHabilitadas, setValue: setSoloHabilitadas } =
    useBoolean(false);

  const [page, setPage] = useState(1);

  const semestreActual = obtenerSemestreActual();

  const { data, isLoading, isError, isSuccess } = useUnidadesCurriculares(
    {
      semestresDeDictado: [semestreActual],
      habilitadas: soloHabilitadas,
    },
    page,
  );

  return (
    <ScreenLayout>
      <ScreenHeader title="Próximo Semestre">
        <SwitchField
          id="solo-habilitadas"
          checked={soloHabilitadas}
          onCheckedChange={setSoloHabilitadas}
          label="Mostrar solamente habilitadas"
        />
      </ScreenHeader>

      {isLoading && <UnidadCurricularGridSkeleton itemsAmount={60} />}

      {isError && <ErrorState />}

      {isSuccess && !data.data.length && (
        <EmptyState message="No se encontraron unidades curriculares pertenecientes a este grupo." />
      )}

      {isSuccess && data.data.length > 0 && (
        <MemoizedUnidadCurricularGrid
          titulo="Listado de unidades curriculares"
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
      )}
    </ScreenLayout>
  );
};
