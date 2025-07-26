import React from "react";

import {
  Button,
  HowPlanGenerationWorksModal,
  InfoCircleIcon,
  ScreenHeader,
} from "@/components";
import { useBoolean } from "@/hooks";

export const PlanificarCarreraHeader = () => {
  const {
    value: show,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean(false);

  return (
    <>
      <ScreenHeader
        title="Planificar Carrera"
        description="Seleccioná los cursos que desees hacer y solicitá un plan de estudios personalizado según tu tiempo de dedicación disponible. Puedes descargar el plan una vez generado."
        rightElement={
          <Button variant="outline" onClick={openModal}>
            <InfoCircleIcon />
            <span className="hidden md:inline-block">¿Cómo Funciona?</span>
          </Button>
        }
      />

      <HowPlanGenerationWorksModal open={show} onClose={closeModal} />
    </>
  );
};
