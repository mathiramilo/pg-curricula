import React from "react";

import { Progress, ScreenHeader } from "@/components";

export const HeaderInicio = () => {
  return (
    <ScreenHeader title="Progreso de Carrera">
      <div className="flex flex-col gap-2">
        <div>
          <p className="text-sm text-fuente-principal">366 creditos</p>
          <Progress value={20} />
        </div>

        <div className="flex gap-6">
          <p className="text-sm text-fuente-principal">
            Matemática:{" "}
            <span className="font-medium text-principal">87/86</span>
          </p>
          <p className="text-sm text-fuente-principal">
            Programacion:{" "}
            <span className="font-medium text-principal">25/60</span>
          </p>
          <p className="text-sm text-fuente-principal">
            Programacion:{" "}
            <span className="font-medium text-principal">12/24</span>
          </p>
        </div>
      </div>
    </ScreenHeader>
  );
};
