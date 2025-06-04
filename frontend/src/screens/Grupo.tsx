import { useState } from "react";
import { useParams } from "react-router-dom";

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
import { capitalizeWords } from "@/utils";

export const GrupoScreen = () => {
  const { slug } = useParams();

  const { value: soloHabilitadas, setValue: setSoloHabilitadas } =
    useBoolean(false);

  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isSuccess } = useUnidadesCurriculares(
    {
      grupo: slug,
      habilitadas: soloHabilitadas,
    },
    page,
  );

  const title = capitalizeWords(slug ?? "");

  return (
    <ScreenLayout>
      <ScreenHeader
        title={title}
        description="Consulta los cursos disponibles para el grupo seleccionado. Puedes filtrar por los que estás habilitado a cursar."
      >
        <SwitchField
          id="solo-habilitadas"
          checked={soloHabilitadas}
          onCheckedChange={setSoloHabilitadas}
          label="Mostrar solamente habilitados"
        />
      </ScreenHeader>

      {isLoading && <UnidadCurricularGridSkeleton itemsAmount={60} />}

      {isError && <ErrorState />}

      {isSuccess && !data.data.length && (
        <EmptyState message="No se encontraron unidades curriculares habilitadas para cursar." />
      )}

      {isSuccess && data.data.length > 0 && (
        <MemoizedUnidadCurricularGrid
          titulo="Cursos disponibles"
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
