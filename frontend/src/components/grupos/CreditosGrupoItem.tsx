import type { ComponentPropsWithoutRef } from "react";
import React from "react";
import { Link } from "react-router-dom";

import { REQUISITOS_TITULO } from "@/models";
import type { Grupo, UnidadCurricular } from "@/models";
import { capitalizeWords, cn } from "@/utils";

type CreditosGrupoItemProps = ComponentPropsWithoutRef<"div"> & {
  grupo: Grupo;
  creditos: UnidadCurricular["creditos"];
};

export const CreditosGrupoItem = ({
  grupo,
  creditos,
  className,
  ...props
}: CreditosGrupoItemProps) => {
  const satisfaceRequisitos = creditos >= REQUISITOS_TITULO[grupo];

  return (
    <div
      key={grupo}
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      <Link
        to={`/grupo/${grupo.toLowerCase()}`}
        className="hover:underline text-sm text-fuente-principal w-max"
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
