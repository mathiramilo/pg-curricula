import React from "react";

import {
  Button,
  HowPlanGenerationWorksModal,
  InfoCircleIcon,
  PdfIcon,
  SchoolIcon,
  ScreenHeader,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components";
import { useBoolean } from "@/hooks";
import type { ScheduleObject } from "@/models";
import { CREDITOS_POR_SEMESTRE_OPTIONS } from "@/models";

interface HeaderTrayectoriaProps {
  creditos: string;
  trayectoria?: ScheduleObject[];
  setCreditos: (value: string) => void;
  handleGenerate: () => void;
  handleDownload: () => void;
}

export const HeaderTrayectoria = ({
  creditos,
  trayectoria,
  setCreditos,
  handleGenerate,
  handleDownload,
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between sm:gap-6 gap-4">
          <div className="flex flex-col gap-1.5 flex-1">
            <label
              htmlFor="creditos-select"
              className="text-fuente-principal text-sm xl:w-52"
            >
              Créditos por semestre:
            </label>

            <Select value={creditos} onValueChange={setCreditos}>
              <SelectTrigger
                id="creditos-select"
                className="lg:w-7/12 xl:max-w-md"
              >
                <SelectValue placeholder="Selecciona una cantidad de créditos" />
              </SelectTrigger>
              <SelectContent>
                {CREDITOS_POR_SEMESTRE_OPTIONS.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
            <Button onClick={handleGenerate}>
              <SchoolIcon />
              <span>Generar Plan</span>
            </Button>

            <Button
              variant="outline"
              onClick={handleDownload}
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
