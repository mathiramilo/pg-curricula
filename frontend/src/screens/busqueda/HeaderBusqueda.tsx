import {
  Checkbox,
  Input,
  ScreenHeader,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
  Switch,
} from "@/components";
import { MAX_CREDITOS, MIN_CREDITOS, useBusquedaContext } from "@/contexts";
import { GRUPO_VALUES, SEMESTRE_DE_DICTADO } from "@/models";
import { capitalizeWords } from "@/utils";

export const HeaderBusqueda = () => {
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
  } = useBusquedaContext();

  return (
    <ScreenHeader title="Busqueda">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ingresá el nombre de la UC"
      />

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:gap-8">
        <Select value={grupo} onValueChange={setGrupo}>
          <SelectTrigger className="xl:w-7/12 xl:max-w-md">
            <SelectValue placeholder="Seleccioná un grupo" />
          </SelectTrigger>
          <SelectContent>
            {GRUPO_VALUES.map((grupo) => (
              <SelectItem key={grupo} value={grupo}>
                {capitalizeWords(grupo)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="w-full flex flex-col gap-2 xl:flex-row xl:items-center max-w-5xl">
          <span className="text-sm text-fuente-principal xl:w-44">
            Rango de Créditos:
          </span>

          <div className="w-full flex items-center gap-1">
            <span className="text-sm text-fuente-principal">
              {rangoCreditos[0]}
            </span>
            <Slider
              value={rangoCreditos}
              min={MIN_CREDITOS}
              max={MAX_CREDITOS}
              step={1}
              onValueChange={setRangoCreditos}
            />
            <span className="text-sm text-fuente-principal">
              {rangoCreditos[1]}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={soloHabilitadas}
            onCheckedChange={setSoloHabilitadas}
          />
          <p className="text-sm xl:w-52">Mostrar solamente habilitadas</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
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
            <p className="text-sm xl:w-52">Primer semestre</p>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
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
            <p className="text-sm xl:w-52">Segundo semestre</p>
          </div>
        </div>
      </div>
    </ScreenHeader>
  );
};
