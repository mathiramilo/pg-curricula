import { CreditosGrupoItem, ScreenHeader, TotalProgress } from "@/components";
import { ScreenLayout } from "@/layouts";
import { GRUPO_VALUES } from "@/models";
import { useInformacionEstudianteStore } from "@/store";

export const ProgresoScreen = () => {
  const informacionEstudiante = useInformacionEstudianteStore(
    (state) => state.informacionEstudiante,
  );

  return (
    <ScreenLayout>
      <ScreenHeader title="Progreso Completo">
        <TotalProgress />
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
