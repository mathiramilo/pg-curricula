import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  UnidadCurricularList,
  TotalProgress,
  Button,
  ErrorState,
  UnidadCurricularGridSkeleton,
  AlertTriangleIcon,
  ConfettiIcon,
} from "@/components";
import type { UnidadCurricular } from "@/models";
import {
  useUnidadesCurriculares,
  useUnidadesCurricularesObligatorias,
  useGeneratePlan,
  // useSatisfacePrevias,
} from "@/hooks";
import { useMiPlanStore, useInformacionEstudianteStore } from "@/store";

export const SeleccionarCursos = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const { creditos, semestreInicial, setPlan } = useMiPlanStore();
  const informacionEstudiante  = useInformacionEstudianteStore.getState().informacionEstudiante;
  
  const toggleSeleccion = (uc: UnidadCurricular, selected: boolean) => {
    setSelected((prev) =>
      selected ? [...prev, uc.codigo] : prev.filter((c) => c !== uc.codigo)
    );
  };

  const { mutate: generatePlan } = useGeneratePlan();

  // 1. Hook de todas las UCs
  const { data, isLoading, isError } = useUnidadesCurriculares(
    {
      semestresDeDictado: ["1", "2"],
    },
    1,
    1000
  );

  const unidadesCurricularesRaw = data?.data || [];

  // 2. Hook de UCs obligatorias
  const { data: obligatoriasData } = useUnidadesCurricularesObligatorias();
  const codigosObligatorias = obligatoriasData?.map((uc) => uc.codigo) ?? [];

  // 3. Agregar propiedad esObligatoria
  const unidadesCurriculares = unidadesCurricularesRaw.map((uc) => ({
    ...uc,
    esObligatoria: codigosObligatorias.includes(uc.codigo),
  }));

  // 4. Marcar automáticamente las obligatorias como seleccionadas al inicio
  useEffect(() => {
    if (codigosObligatorias.length > 0 && unidadesCurriculares.length > 0) {
      setSelected(codigosObligatorias);
    }
  }, [codigosObligatorias.length, unidadesCurriculares.length]);

  // 4. Agrupar por grupo hijo
  const unidadesPorGrupoHijo = unidadesCurriculares.reduce((acc, unidad) => {
    const grupo = unidad.nombreGrupoHijo;
    if (!acc[grupo]) {
      acc[grupo] = [];
    }
    acc[grupo].push(unidad);
    return acc;
  }, {} as Record<string, UnidadCurricular[]>);

  // 5. Calcular créditos seleccionados
  const creditosTotalesSeleccionados = unidadesCurriculares
    .filter((uc) => selected.includes(uc.codigo))
    .reduce((sum, uc) => sum + uc.creditos, 0);

  const handleReset = () => {
    setSelected([]);
  };

    // 6. Obtener las unidades seleccionadas completas
  const unidadesSeleccionadas = unidadesCurricularesRaw.filter((uc) =>
    selected.includes(uc.codigo)
  );

  const handleGenerate = async () => {
    // const aprobadas = informacionEstudiante.unidadesCurricularesAprobadas ?? [];

    const errores: string[] = [];
    let seleccionadasComoAprobadas: Record<string, UnidadCurricular> = {};
    for (const uc of unidadesSeleccionadas) {
      seleccionadasComoAprobadas[uc.codigo] = uc;
    }

    // for (const uc of unidadesSeleccionadas) {
    //   const UCs = {
    //     ...aprobadas,
    //     unidadesSeleccionadas
    //   }

    //   const informacionTemporal = {
    //     unidadesSeleccionadasAprobadas: UCs,
    //     creditosTotales: creditosTotalesSeleccionados
    //   };

    //   try {
    //     const { mutateAsync } = useSatisfacePrevias();

    //     const cumple = await mutateAsync({
    //       codigo: uc.codigo,
    //       informacionEstudianteTemporal: informacionTemporal,
    //     });

    //     if (!cumple) {
    //       errores.push(uc.nombre);
    //     }
    //   } catch (error) {
    //     errores.push(`${uc.nombre} (error al verificar)`);
    //   }
    // }

    if (errores.length > 0) {
      toast.error("Algunas materias no cumplen con las previaturas", {
        icon: <AlertTriangleIcon className="size-5" />,
        description: errores.join(", "),
      });
      return;
    }

    // Todas cumplen, ahora generamos el plan
    generatePlan(
      {
        creditosPorSemestre: Number(creditos),
        semestreInicial,
        listadoUcs: unidadesSeleccionadas,
      },
      {
        onError: () => {
          toast.error("Ha ocurrido un error al generar tu plan", {
            icon: <AlertTriangleIcon className="size-5" />,
            description: "Por favor intenta nuevamente en unos minutos.",
          });
        },
        onSuccess: (data) => {
          setPlan(data);

          toast.success("Tu plan ha sido generado con éxito", {
            icon: <ConfettiIcon className="size-5" />,
            description: "Ahora puedes explorarlo y descargarlo!",
          });
        },
      }
    );
  };
  
  const notEnoughCredits = creditosTotalesSeleccionados < 450;

  return (
    <div className="p-4 pt-0">
      <div className="pb-4 flex flex-col lg:flex-row lg:items-center justify-between">
        <h2 className="font-medium text-fuente-principal">{"Seleccionar cursos"}</h2>
        <div className="mt-2 lg:mt-0 flex gap-2">
          <Button variant="outline" onClick={handleGenerate} disabled={notEnoughCredits}>
            Generar selección
          </Button>
          <Button variant="destructive" onClick={handleReset}>
            Reiniciar selección
          </Button>
        </div>
      </div>

      {isLoading && <UnidadCurricularGridSkeleton itemsAmount={60} />}
      {isError && <ErrorState />}

      <div className="mb-4">
        <div className="md:w-[calc(100vw-290px)] flex flex-col gap-2">
          <TotalProgress creditos={creditosTotalesSeleccionados} type={"seleccionarCursos"} />
        </div>
      </div>

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
