import { UnidadCurricularGrid, UnidadCurricularList } from "@/components";
import { unidadesCurriculares } from "../mock";

export const UnidadesCurriculares = () => {
  return (
    <>
      <section className="mt-8 grid gap-8 lg:gap-12 lg:grid-cols-3">
        <UnidadCurricularList
          unidadesCurriculares={unidadesCurriculares}
          titulo="Primer Semestre"
        />
        <UnidadCurricularList
          unidadesCurriculares={unidadesCurriculares}
          titulo="Segundo Semestre"
        />
        <UnidadCurricularList
          unidadesCurriculares={unidadesCurriculares}
          titulo="Tercer Semestre"
        />
      </section>

      <section className="mt-8 grid gap-8 lg:gap-12 lg:grid-cols-3">
        <UnidadCurricularList
          unidadesCurriculares={unidadesCurriculares}
          titulo="Cuarto Semestre"
        />
        <UnidadCurricularList
          unidadesCurriculares={unidadesCurriculares}
          titulo="Quinto Semestre"
        />
        <UnidadCurricularList
          unidadesCurriculares={unidadesCurriculares}
          titulo="Sexto Semestre"
        />
      </section>

      <section className="mt-8">
        <UnidadCurricularGrid
          unidadesCurriculares={[
            ...unidadesCurriculares,
            ...unidadesCurriculares,
            ...unidadesCurriculares,
            ...unidadesCurriculares,
            ...unidadesCurriculares,
            ...unidadesCurriculares,
            ...unidadesCurriculares,
            ...unidadesCurriculares,
            ...unidadesCurriculares,
            ...unidadesCurriculares,
            ...unidadesCurriculares,
          ]}
          titulo="Materias Opcionales"
        />
      </section>
    </>
  );
};
