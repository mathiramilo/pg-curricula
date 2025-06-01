import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  ChevronRightIcon,
  CreditosGrupoItem,
  ScreenHeader,
  TotalProgress,
} from "@/components";
import { GRUPO_VALUES } from "@/models";
import { RUTAS } from "@/router";
import { useInformacionEstudianteStore } from "@/store";

export const HeaderInicio = () => {
  const informacionEstudiante = useInformacionEstudianteStore(
    (state) => state.informacionEstudiante,
  );

  return (
    <ScreenHeader title="Progreso de Carrera">
      <div className="sm:w-[calc(100vw-274px)] flex flex-col gap-2">
        <TotalProgress />

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
