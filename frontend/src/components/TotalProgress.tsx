import React from "react";

import { Progress } from "@/components";
import { REQUISITOS_TITULO } from "@/models";
import { useInformacionEstudianteStore } from "@/store";
import { calculatePercentage } from "@/utils";

type TotalProgressProps = {
  creditos?: number;
  type?: "seleccionarCursos";
};

export const TotalProgress = ({creditos, type} : TotalProgressProps) => {
  let creditosTotales = 0
  if (type === "seleccionarCursos") {
    creditosTotales = creditos || 0;
  }
  else { creditosTotales =
    useInformacionEstudianteStore(
      (state) => state.informacionEstudiante.creditosTotales,
    );
  }

  const progressPercentage = calculatePercentage(
    creditosTotales,
    REQUISITOS_TITULO.CREDITOS_TOTALES,
  );

  const satisfaceCreditosTotales =
    creditosTotales >= REQUISITOS_TITULO.CREDITOS_TOTALES;

  return (
    <div>
      <p className="text-sm text-fuente-principal">
        {creditosTotales}/{REQUISITOS_TITULO.CREDITOS_TOTALES} creditos
      </p>
      <Progress
        value={progressPercentage}
        className={satisfaceCreditosTotales ? "[&>div]:bg-green-600" : ""}
      />
    </div>
  );
};
