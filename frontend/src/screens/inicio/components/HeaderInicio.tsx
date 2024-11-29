import React from "react";
import { Link } from "react-router-dom";

import { Button, ChevronRightIcon, Progress, ScreenHeader } from "@/components";
import { RUTAS } from "@/router";

export const HeaderInicio = () => {
  return (
    <ScreenHeader title="Progreso de Carrera">
      <div className="flex flex-col gap-2">
        <div>
          <p className="text-sm text-fuente-principal">366 creditos</p>
          <Progress value={20} />
        </div>

        <div className="w-full flex items-center justify-between gap-x-6 gap-y-1 flex-wrap sm:flex-nowrap">
          <div className="flex sm:flex-1 gap-x-4 sm:gap-x-6 gap-y-1 overflow-y-scroll sm:overflow-y-hidden">
            <p className="flex items-center gap-1 text-nowrap text-sm text-fuente-principal">
              Matemática:{" "}
              <span className="font-medium text-principal">87/86</span>
            </p>
            <p className="flex items-center gap-1 text-nowrap text-sm text-fuente-principal">
              Programacion:{" "}
              <span className="font-medium text-principal">25/60</span>
            </p>
            <p className="flex items-center gap-1 text-nowrap text-sm text-fuente-principal">
              Bases de datos:{" "}
              <span className="font-medium text-principal">12/24</span>
            </p>
          </div>

          <Link to={RUTAS.PROGRESO}>
            <Button variant="link" className="px-0">
              Ver Todo
              <ChevronRightIcon className="text-principal" />
            </Button>
          </Link>
        </div>
      </div>
    </ScreenHeader>
  );
};
