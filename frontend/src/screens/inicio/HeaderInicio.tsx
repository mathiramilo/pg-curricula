import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  ChevronRightIcon,
  CreditosGrupoItem,
  Progress,
  ScreenHeader,
} from "@/components";
import { GRUPO_VALUES, REQUISITOS_TITULO } from "@/models";
import { RUTAS } from "@/router";
import { useStore } from "@/store";
import { calculatePercentage } from "@/utils";

export const HeaderInicio = () => {
  const informacionEstudiante = useStore(
    (state) => state.informacionEstudiante,
  );

  const creditosTotales = informacionEstudiante.creditosTotales;

  const progressPercentage = calculatePercentage(
    creditosTotales,
    REQUISITOS_TITULO.CREDITOS_TOTALES,
  );

  const satisfaceCreditosTotales =
    informacionEstudiante.creditosTotales >= REQUISITOS_TITULO.CREDITOS_TOTALES;

  return (
    <ScreenHeader title="Progreso de Carrera">
      <div className="sm:w-[calc(100vw-230px)] flex flex-col gap-2">
        <div>
          <p className="text-sm text-fuente-principal">
            {creditosTotales} creditos
          </p>
          <Progress
            value={progressPercentage}
            className={satisfaceCreditosTotales ? "[&>div]:bg-green-600" : ""}
          />
        </div>

        <div className="flex items-center justify-between gap-x-6 gap-y-1">
          <div className="flex items-center gap-4 overflow-x-scroll grow">
            {GRUPO_VALUES.map((grupo) => (
              <CreditosGrupoItem
                key={grupo}
                grupo={grupo}
                creditos={informacionEstudiante[grupo]}
              />
            ))}
          </div>

          <Button asChild variant="link" className="px-0">
            <Link to={RUTAS.PROGRESO}>
              Ver Todo
              <ChevronRightIcon className="text-principal" />
            </Link>
          </Button>
        </div>
      </div>
    </ScreenHeader>
  );
};
