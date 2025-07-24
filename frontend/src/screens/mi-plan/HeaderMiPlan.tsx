import React from "react";

import {
  Button,
  HowPlanGenerationWorksModal,
  InfoCircleIcon,
  ScreenHeader,
} from "@/components";
import { useBoolean } from "@/hooks";

export const HeaderMiPlan = () => {
  const {
    value: show,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean(false);

  return (
    <>
      <ScreenHeader
        title="Generar Plan de Carrera"
        description="Solicita un plan de carrera personalizado basado en tus créditos y semestre inicial. Puedes descargar el plan una vez generado."
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
