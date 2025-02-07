import { CreditosGrupoItem, ScreenHeader } from "@/components";
import { ScreenLayout } from "@/layouts";
import { cn } from "@/lib";
import { GRUPO_VALUES, REQUISITOS_TITULO } from "@/models";
import { useStore } from "@/store";

export const ProgresoScreen = () => {
  const informacionEstudiante = useStore(
    (state) => state.informacionEstudiante,
  );

  const satisfaceCreditosTotales =
    informacionEstudiante.creditosTotales >= REQUISITOS_TITULO.CREDITOS_TOTALES;

  return (
    <ScreenLayout>
      <ScreenHeader title="Progreso Completo"></ScreenHeader>

      <section className="my-6 flex flex-col gap-2">
        <h3 className="text-fuente-principal text-lg font-medium">
          Creditos totales:{" "}
          <span
            className={cn(
              "text-principal",
              !satisfaceCreditosTotales && "text-red-500",
            )}
          >
            {informacionEstudiante.creditosTotales}/
            {REQUISITOS_TITULO.CREDITOS_TOTALES}
          </span>
        </h3>

        <div className="mt-6">
          <h3 className="mb-4 font-medium text-fuente-principal">
            Creditos por grupo:
          </h3>

          <div className="flex flex-col gap-2">
            {GRUPO_VALUES.map((grupo) => (
              <CreditosGrupoItem
                key={grupo}
                grupo={grupo}
                creditos={informacionEstudiante[grupo]}
              />
            ))}
          </div>
        </div>
      </section>
    </ScreenLayout>
  );
};
