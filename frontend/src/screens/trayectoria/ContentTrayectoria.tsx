import React from "react";

import { EmptyState, ErrorState, UnidadCurricularList } from "@/components";
import type { ScheduleObject } from "@/models";
import { TrayectoriaSugeridaLoading } from "../inicio/TrayectoriaSugeridaLoading";

interface ContentTrayectoriaProps {
  trayectoria?: ScheduleObject[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export const ContentTrayectoria = ({
  trayectoria,
  isLoading,
  isSuccess,
  isError,
}: ContentTrayectoriaProps) => {
  if (isLoading) {
    return <TrayectoriaSugeridaLoading />;
  }

  if (isError) {
    return <ErrorState className="mt-8" />;
  }

  if (!trayectoria?.length) {
    return (
      <EmptyState message="Selecciona la cantidad de créditos por semestre y clickea en generar plan para poder visualizar tu plan personalizado" />
    );
  }

  return (
    <section className="grid gap-8 lg:gap-12 lg:grid-cols-3">
      {isSuccess &&
        trayectoria.map(({ semestre, unidadesCurriculares, creditos }) => {
          return (
            <UnidadCurricularList
              key={semestre}
              unidadesCurriculares={unidadesCurriculares}
              titulo={`Primer Semestre 2026 (${creditos} créditos)`}
              type="creditos"
            />
          );
        })}
    </section>
  );
};
