import {
  MemoizedUnidadCurricularGrid,
  UnidadCurricularList,
} from "@/components";
import { useTrayectoriaSugerida } from "@/hooks";
import { getSemestreTitle } from "@/utils";
import { TrayectoriaSugeridaLoading } from "./TrayectoriaSugeridaLoading";

export const TrayectoriaSugerida = () => {
  const {
    data: trayectoriaSugerida,
    isLoading,
    isSuccess,
    isError,
  } = useTrayectoriaSugerida();

  if (isLoading) {
    return <TrayectoriaSugeridaLoading />;
  }

  if (isError) {
    return <div>Ha ocurrido un error inesperado</div>;
  }

  return (
    <section className="mt-8 grid gap-8 lg:gap-12 lg:grid-cols-3">
      {isSuccess &&
        trayectoriaSugerida.map(({ semestre, unidadesCurriculares }) => {
          if (semestre) {
            return (
              <UnidadCurricularList
                key={semestre}
                unidadesCurriculares={unidadesCurriculares}
                titulo={getSemestreTitle(semestre)}
              />
            );
          }

          return (
            <MemoizedUnidadCurricularGrid
              key="opcional"
              unidadesCurriculares={unidadesCurriculares}
              titulo={getSemestreTitle(semestre)}
              className="col-span-full"
            />
          );
        })}
    </section>
  );
};
