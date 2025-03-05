import React from "react";
import { Link } from "react-router-dom";

import { REQUISITOS_TITULO } from "@/models";
import type { Grupo, UnidadCurricular } from "@/models";
import { capitalizeWords, cn } from "@/utils";

interface CreditosGrupoItemProps {
  grupo: Grupo;
  creditos: UnidadCurricular["creditos"];
}

export const CreditosGrupoItem = ({
  grupo,
  creditos,
}: CreditosGrupoItemProps) => {
  const satisfaceRequisitos = creditos >= REQUISITOS_TITULO[grupo];

  return (
    <div key={grupo} className="flex items-center gap-1">
      <Link
        to={`/grupo/${grupo}`}
        className="hover:underline text-sm text-fuente-principal"
      >
        {capitalizeWords(grupo)}:
      </Link>
      <span
        className={cn(
          "text-sm font-medium text-principal",
          !satisfaceRequisitos && "text-red-500",
        )}
      >
        {creditos}/{REQUISITOS_TITULO[grupo]}
      </span>
    </div>
  );
};
