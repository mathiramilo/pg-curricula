import { MemoizedUnidadCurricularGrid } from "@/components";
import { useBusquedaContext } from "@/contexts";
import { useUnidadesCurriculares } from "@/hooks";

export const ContentBusqueda = () => {
  const { debouncedQuery, grupo, debouncedRangoCreditos, soloHabilitadas } =
    useBusquedaContext();

  const { data: unidadesCurriculares, isLoading } = useUnidadesCurriculares({
    nombre: debouncedQuery,
    grupo,
    minCreditos: debouncedRangoCreditos[0],
    maxCreditos: debouncedRangoCreditos[1],
    habilitadas: soloHabilitadas,
  });

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!unidadesCurriculares?.length) {
    return <div>No se encontraron resultados</div>;
  }

  return (
    <MemoizedUnidadCurricularGrid
      titulo="Resultados"
      unidadesCurriculares={unidadesCurriculares}
      className="mt-8"
    />
  );
};
