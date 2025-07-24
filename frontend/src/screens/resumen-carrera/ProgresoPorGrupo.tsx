import { CreditosGrupoItem } from "@/components";
import { GRUPO_VALUES } from "@/models";
import { useInformacionEstudianteStore } from "@/store";

export const ProgresoPorGrupo = () => {
  const informacionEstudiante = useInformacionEstudianteStore(
    (state) => state.informacionEstudiante,
  );

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-medium text-lg text-fuente-principal">
        Créditos por grupo
      </h2>

      <div className="w-full grid lg:grid-cols-3 gap-x-12 gap-y-2">
        {GRUPO_VALUES.map((grupo) => (
          <CreditosGrupoItem
            key={grupo}
            grupo={grupo}
            creditos={informacionEstudiante[grupo]}
            className="justify-between"
          />
        ))}
      </div>
    </section>
  );
};
