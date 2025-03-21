import { useParams } from "react-router-dom";

import {
  EmptyState,
  ErrorState,
  MemoizedUnidadCurricularGrid,
  ScreenHeader,
  Switch,
  UnidadCurricularGridSkeleton,
} from "@/components";
import { useBoolean, useUnidadesCurriculares } from "@/hooks";
import { ScreenLayout } from "@/layouts";
import { capitalizeWords } from "@/utils";

export const GrupoScreen = () => {
  const { slug } = useParams();

  const { value: soloHabilitadas, setValue: setSoloHabilitadas } =
    useBoolean(false);

  const {
    data: unidadesCurriculares,
    isLoading,
    isError,
    isSuccess,
  } = useUnidadesCurriculares({
    grupo: slug,
    habilitadas: soloHabilitadas,
  });

  const title = capitalizeWords(slug ?? "");

  return (
    <ScreenLayout className="flex flex-col gap-8">
      <ScreenHeader title={title}>
        <div className="flex items-center gap-2">
          <Switch
            checked={soloHabilitadas}
            onCheckedChange={setSoloHabilitadas}
          />
          <p className="text-sm">Mostrar solamente habilitadas</p>
        </div>
      </ScreenHeader>

      {isLoading && <UnidadCurricularGridSkeleton itemsAmount={78} />}

      {isError && <ErrorState />}

      {isSuccess && !unidadesCurriculares?.length && <EmptyState />}

      {isSuccess && unidadesCurriculares && (
        <MemoizedUnidadCurricularGrid
          titulo="Listado de unidades curriculares"
          unidadesCurriculares={unidadesCurriculares}
        />
      )}
    </ScreenLayout>
  );
};
