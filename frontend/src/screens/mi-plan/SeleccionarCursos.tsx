import React, {useState} from "react";
import { UnidadCurricularList, TotalProgress, Button, ErrorState, UnidadCurricularGridSkeleton } from "@/components";
import type { UnidadCurricular } from "@/models";
import { useUnidadesCurriculares } from "@/hooks";

export const SeleccionarCursos = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSeleccion = (uc: UnidadCurricular, selected: boolean) => {
    setSelected((prev) =>
      selected ? [...prev, uc.codigo] : prev.filter((c) => c !== uc.codigo)
    );
  };

  const { data, isLoading, isError } = useUnidadesCurriculares(
    {
      semestresDeDictado: ["1","2"],
    },
    1, //TODO: necesitaria que me venga todo de una
  );

  const unidadesCurriculares = data?.data || [];

  const unidadesPorGrupoHijo = unidadesCurriculares.reduce((acc, unidad) => {
    const grupo = unidad.nombreGrupoHijo;
    if (!acc[grupo]) {
      acc[grupo] = [];
    }
    acc[grupo].push(unidad);
    return acc;
  }, {} as Record<string, UnidadCurricular[]>);

  const creditosTotalesSeleccionados = unidadesCurriculares
  .filter((uc) => selected.includes(uc.codigo))
  .reduce((sum, uc) => sum + uc.creditos, 0);

  const handleReset = () => {
    setSelected([]);
  }

  return (
    <div className="p-4 pt-0">
      <div className="pb-4 flex flex-col lg:flex-row lg:items-center justify-between">
        <h2 className="font-medium text-fuente-principal">
          {"Seleccionar cursos"}
        </h2>
        <div className="mt-2 lg:mt-0 flex gap-2">
          <Button variant="outline" onClick={() => console.log("Generar al azar")}>
            Generar selección
          </Button>
          <Button variant="destructive" onClick={handleReset}>
            Reiniciar selección
          </Button>
        </div>
      </div>

      {isLoading && <UnidadCurricularGridSkeleton itemsAmount={60} />}

      {isError && <ErrorState />}

      <>
        <div className="mb-4">
        <div className="md:w-[calc(100vw-290px)] flex flex-col gap-2">
          <TotalProgress creditos={creditosTotalesSeleccionados} type={"seleccionarCursos"} />
        </div>
        </div>
      </>

      <section className="grid gap-8 lg:gap-12 lg:grid-cols-3 pt-4">
        {Object.entries(unidadesPorGrupoHijo).map(([area, unidades]) => (
        <UnidadCurricularList
            key={area}
            unidadesCurriculares={unidades}
            titulo={area}
            type="seleccion"
            selectedUcs={selected}
            onToggleSelect={toggleSeleccion}
            mostrarCreditosGrupo={true}
        />
        ))}
    </section>
    </div>
  );
};