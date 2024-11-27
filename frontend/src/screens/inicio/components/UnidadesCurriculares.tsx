import { UnidadCurricularGrid, UnidadCurricularList } from "@/components";
import { unidadesCurriculares } from "../mock";

export const UnidadesCurriculares = () => {
  return (
    <>
      <section className="mt-8 flex items-center justify-between gap-12">
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

      <section className="mt-8 flex items-center justify-between gap-12">
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

      <section className="mt-8 flex items-center justify-between gap-12">
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
