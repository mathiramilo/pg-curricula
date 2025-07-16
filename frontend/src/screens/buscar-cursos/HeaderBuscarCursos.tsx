import {
  Button,
  CheckboxField,
  FilterMinusIcon,
  Input,
  ScreenHeader,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SliderField,
  SwitchField,
} from "@/components";
import { MAX_CREDITOS, MIN_CREDITOS, useBusquedaContext } from "@/contexts";
import { GRUPO_VALUES, SEMESTRE_DE_DICTADO } from "@/models";
import { capitalizeWords } from "@/utils";

export const HeaderBuscarCursos = () => {
  const {
    query,
    grupo,
    rangoCreditos,
    soloHabilitadas,
    semestresDeDictado,
    setQuery,
    setGrupo,
    setRangoCreditos,
    setSoloHabilitadas,
    setSemestresDeDictado,
    clearFilters,
  } = useBusquedaContext();

  return (
    <ScreenHeader
      title="Buscar Cursos"
      description="Busca cursos por nombre, grupo, créditos, habilitación y semestre de dictado."
      rightElement={
        <Button variant="outline" onClick={clearFilters}>
          <FilterMinusIcon />
          <span className="hidden md:inline-block">Limpiar Filtros</span>
        </Button>
      }
    >
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ingresa el nombre del curso"
      />

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:gap-8">
        {/* REVIEW: <SelectField /> */}
        <Select value={grupo} onValueChange={setGrupo}>
          <SelectTrigger className="xl:w-7/12 xl:max-w-md">
            <SelectValue placeholder="Selecciona un grupo" />
          </SelectTrigger>
          <SelectContent>
            {GRUPO_VALUES.map((grupo) => (
              <SelectItem key={grupo} value={grupo}>
                {capitalizeWords(grupo)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <SliderField
          title="Rango de Créditos:"
          value={rangoCreditos}
          min={MIN_CREDITOS}
          max={MAX_CREDITOS}
          step={1}
          onValueChange={setRangoCreditos}
          leftLabel={rangoCreditos[0].toString()}
          rightLabel={rangoCreditos[1].toString()}
          containerClassName="max-w-5xl"
        />

        <SwitchField
          id="solo-habilitadas"
          checked={soloHabilitadas}
          onCheckedChange={setSoloHabilitadas}
          label="Mostrar solamente habilitados"
        />
      </div>

      <div className="flex items-center gap-4">
        <CheckboxField
          id="primer-semestre"
          label="Primer semestre"
          checked={semestresDeDictado.includes(
            SEMESTRE_DE_DICTADO.PRIMER_SEMESTRE,
          )}
          onCheckedChange={(checked) => {
            setSemestresDeDictado((prev) =>
              checked
                ? [...prev, SEMESTRE_DE_DICTADO.PRIMER_SEMESTRE]
                : prev.filter(
                    (semestre) =>
                      semestre !== SEMESTRE_DE_DICTADO.PRIMER_SEMESTRE,
                  ),
            );
          }}
        />

        <CheckboxField
          id="segundo-semestre"
          label="Segundo semestre"
          checked={semestresDeDictado.includes(
            SEMESTRE_DE_DICTADO.SEGUNDO_SEMESTRE,
          )}
          onCheckedChange={(checked) => {
            setSemestresDeDictado((prev) =>
              checked
                ? [...prev, SEMESTRE_DE_DICTADO.SEGUNDO_SEMESTRE]
                : prev.filter(
                    (semestre) =>
                      semestre !== SEMESTRE_DE_DICTADO.SEGUNDO_SEMESTRE,
                  ),
            );
          }}
        />
      </div>
    </ScreenHeader>
  );
};
