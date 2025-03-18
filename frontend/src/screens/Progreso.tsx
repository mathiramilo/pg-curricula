import { CreditosGrupoItem, Progress, ScreenHeader } from "@/components";
import { ScreenLayout } from "@/layouts";
import { GRUPO_VALUES, REQUISITOS_TITULO } from "@/models";
import { useStore } from "@/store";
import { calculatePercentage } from "@/utils";

export const ProgresoScreen = () => {
  const informacionEstudiante = useStore(
    (state) => state.informacionEstudiante,
  );

  const creditosTotales = informacionEstudiante.creditosTotales;

  const progressPercentage = calculatePercentage(
    creditosTotales,
    REQUISITOS_TITULO.CREDITOS_TOTALES,
  );

  const satisfaceCreditosTotales =
    informacionEstudiante.creditosTotales >= REQUISITOS_TITULO.CREDITOS_TOTALES;

  return (
    <ScreenLayout>
      <ScreenHeader title="Progreso Completo">
        <div>
          <p className="text-sm text-fuente-principal">
            {creditosTotales} creditos
          </p>
          <Progress
            value={progressPercentage}
            className={satisfaceCreditosTotales ? "[&>div]:bg-green-600" : ""}
          />
        </div>
      </ScreenHeader>

      <section className="my-6 flex flex-col gap-2">
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
      </section>
    </ScreenLayout>
  );
};
