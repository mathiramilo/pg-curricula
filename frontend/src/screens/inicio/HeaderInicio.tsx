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
import { ROUTES } from "@/router";
import { useInformacionEstudianteStore } from "@/store";

export const HeaderInicio = () => {
  const informacionEstudiante = useInformacionEstudianteStore(
    (state) => state.informacionEstudiante,
  );

  return (
    <ScreenHeader
      title="Progreso de Carrera"
      description='Visualiza tu avance académico, marca tus cursos aprobados y planifica tu carrera. Sube tu escolaridad como punto de partida usando la opción "Cargar Progreso".'
    >
      <div className="md:w-[calc(100vw-290px)] flex flex-col gap-2">
        <TotalProgress creditos={informacionEstudiante.creditosTotales} />

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
            <Link to={ROUTES.RESUMEN_CARRERA}>
              Ver Todo
              <ChevronRightIcon className="text-principal" />
            </Link>
          </Button>
        </div>
      </div>
    </ScreenHeader>
  );
};
