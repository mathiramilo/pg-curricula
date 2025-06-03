import React from "react";

import {
  Button,
  HowPlanGenerationWorksModal,
  InfoCircleIcon,
  PdfIcon,
  SchoolIcon,
  ScreenHeader,
  SelectField,
} from "@/components";
import { useBoolean } from "@/hooks";
import type { ScheduleObject, SemestreDeDictado } from "@/models";
import {
  CREDITOS_POR_SEMESTRE_OPTIONS,
  SEMESTRE_INICIAL_OPTIONS,
} from "@/models";

interface HeaderTrayectoriaProps {
  creditos: string;
  semestreInicial: SemestreDeDictado;
  trayectoria?: ScheduleObject[];
  setCreditos: (value: string) => void;
  setSemestreInicial: (value: SemestreDeDictado) => void;
  onGenerate: () => void;
  onDownload: () => void;
}

export const HeaderTrayectoria = ({
  creditos,
  semestreInicial,
  trayectoria,
  setCreditos,
  setSemestreInicial,
  onGenerate,
  onDownload,
}: HeaderTrayectoriaProps) => {
  const {
    value: show,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean(false);

  return (
    <>
      <ScreenHeader
        title="Generar Plan de Carrera"
        rightElement={
          <Button variant="outline" onClick={openModal}>
            <InfoCircleIcon />
            <span className="hidden md:inline-block">¿Cómo Funciona?</span>
          </Button>
        }
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between lg:gap-6 gap-4">
          <div className="flex flex-col lg:flex-row lg:items-end lg:gap-4 gap-2 flex-1">
            <SelectField
              label="Créditos por semestre:"
              options={CREDITOS_POR_SEMESTRE_OPTIONS}
              value={creditos}
              onValueChange={setCreditos}
              id="creditos-select"
              placeholder="Selecciona una cantidad de créditos"
              containerClassName="flex-1 lg:max-w-60"
            />

            <SelectField
              label="Semestre inicial:"
              options={SEMESTRE_INICIAL_OPTIONS}
              value={semestreInicial}
              onValueChange={setSemestreInicial}
              id="semestre-inicial-select"
              placeholder="Selecciona el semestre inicial"
              containerClassName="flex-1 lg:max-w-60"
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 gap-2">
            <Button onClick={onGenerate}>
              <SchoolIcon />
              <span>Generar Plan</span>
            </Button>

            <Button
              variant="outline"
              onClick={onDownload}
              disabled={!trayectoria}
            >
              <PdfIcon />
              <span>Descargar Plan</span>
            </Button>
          </div>
        </div>
      </ScreenHeader>

      <HowPlanGenerationWorksModal open={show} onClose={closeModal} />
    </>
  );
};
