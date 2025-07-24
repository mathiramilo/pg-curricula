import { Input } from "@/components";
import { useInformacionEstudianteStore } from "@/store";

const TIPO_MODULO = {
  TALLER: "taller",
  EXTENSION: "extension",
} as const;
type TipoModulo = (typeof TIPO_MODULO)[keyof typeof TIPO_MODULO];

export const ModulosTallerExtension = () => {
  const informacionEstudiante = useInformacionEstudianteStore(
    (state) => state.informacionEstudiante,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: TipoModulo,
  ) => {
    const previousValue =
      type === TIPO_MODULO.TALLER
        ? informacionEstudiante.modulosTaller
        : informacionEstudiante.modulosExtension;

    const newValue = parseInt(e.target.value);

    const difference = newValue - previousValue;

    if (!isNaN(newValue)) {
      useInformacionEstudianteStore.setState((state) => ({
        informacionEstudiante: {
          ...state.informacionEstudiante,
          [type === TIPO_MODULO.TALLER ? "modulosTaller" : "modulosExtension"]:
            newValue,
          creditosTotales:
            state.informacionEstudiante.creditosTotales + difference,
          "A.INTEG,TALLERES,PASANT.Y PROY":
            state.informacionEstudiante["A.INTEG,TALLERES,PASANT.Y PROY"] +
            difference,
        },
      }));
    } else {
      useInformacionEstudianteStore.setState((state) => ({
        informacionEstudiante: {
          ...state.informacionEstudiante,
          [type === TIPO_MODULO.TALLER ? "modulosTaller" : "modulosExtension"]:
            previousValue,
        },
      }));
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-medium text-lg text-fuente-principal">
        Módulos de taller y extensión
      </h2>

      <div className="w-full grid lg:grid-cols-3 gap-x-12 gap-y-2">
        <div>
          <label
            htmlFor="modulos-taller"
            className="text-sm text-fuente-principal"
          >
            Créditos en módulos de taller
          </label>
          <Input
            id="modulos-taller"
            type="number"
            min={0}
            max={18}
            value={informacionEstudiante.modulosTaller}
            onChange={(e) => handleChange(e, TIPO_MODULO.TALLER)}
          />
        </div>
        <div>
          <label
            htmlFor="modulos-extension"
            className="text-sm text-fuente-principal"
          >
            Créditos en módulos de extensión
          </label>
          <Input
            id="modulos-extension"
            type="number"
            min={0}
            max={18}
            value={informacionEstudiante.modulosExtension}
            onChange={(e) => handleChange(e, TIPO_MODULO.EXTENSION)}
          />
        </div>
      </div>
    </section>
  );
};
