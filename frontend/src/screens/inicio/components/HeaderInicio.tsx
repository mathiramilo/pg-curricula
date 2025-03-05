import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  ChevronRightIcon,
  CreditosGrupoItem,
  Progress,
  ScreenHeader,
} from "@/components";
import { GRUPO, REQUISITOS_TITULO } from "@/models";
import { RUTAS } from "@/router";
import { useStore } from "@/store";
import { calculatePercentage } from "@/utils";

export const HeaderInicio = () => {
  const informacionEstudiante = useStore(
    (state) => state.informacionEstudiante,
  );

  const creditosObtenidos = informacionEstudiante.creditosTotales;

  const progressPercentage = calculatePercentage(
    creditosObtenidos,
    REQUISITOS_TITULO.CREDITOS_TOTALES,
  );

  return (
    <ScreenHeader title="Progreso de Carrera">
      <div className="flex flex-col gap-2">
        <div>
          <p className="text-sm text-fuente-principal">
            {creditosObtenidos} creditos
          </p>
          <Progress value={progressPercentage} />
        </div>

        <div className="w-full flex items-center justify-between gap-x-6 gap-y-1 flex-wrap sm:flex-nowrap">
          <div className="flex sm:flex-1 gap-x-4 sm:gap-x-6 gap-y-1 overflow-y-scroll sm:overflow-y-hidden">
            <CreditosGrupoItem
              grupo={GRUPO.MATEMATICA}
              creditos={informacionEstudiante[GRUPO.MATEMATICA]}
            />
            <CreditosGrupoItem
              grupo={GRUPO.PROGRAMACION}
              creditos={informacionEstudiante[GRUPO.PROGRAMACION]}
            />
            <CreditosGrupoItem
              grupo={GRUPO.INGENIERIA_DE_SOFTWARE}
              creditos={informacionEstudiante[GRUPO.INGENIERIA_DE_SOFTWARE]}
            />
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
