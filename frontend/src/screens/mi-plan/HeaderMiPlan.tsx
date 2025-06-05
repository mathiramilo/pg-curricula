import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

import {
  Button,
  HowPlanGenerationWorksModal,
  InfoCircleIcon,
  PdfIcon,
  PlanPdf,
  SchoolIcon,
  ScreenHeader,
  SelectField,
} from "@/components";
import { useBoolean, useSatisfaceRequisitos } from "@/hooks";
import {
  CREDITOS_POR_SEMESTRE_OPTIONS,
  SEMESTRE_INICIAL_OPTIONS,
} from "@/models";
import { useMiPlanStore } from "@/store";

const PDF_FILE_NAME = "plan-carrera-computacion.pdf";

interface HeaderMiPlanProps {
  onGenerate: () => void;
}

export const HeaderMiPlan = ({ onGenerate }: HeaderMiPlanProps) => {
  const { creditos, semestreInicial, plan, setCreditos, setSemestreInicial } =
    useMiPlanStore();

  const {
    value: show,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean(false);

  const { satisfaceRequisitos } = useSatisfaceRequisitos();

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
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between lg:gap-6 gap-4">
          <div className="flex flex-col lg:flex-row lg:items-end lg:gap-4 gap-2 flex-1">
            <SelectField
              label="Créditos por semestre:"
              options={CREDITOS_POR_SEMESTRE_OPTIONS}
              value={creditos}
              onValueChange={setCreditos}
              disabled={satisfaceRequisitos}
              id="creditos-select"
              placeholder="Selecciona una cantidad de créditos"
              containerClassName="flex-1 lg:max-w-60"
            />

            <SelectField
              label="Semestre de inicio:"
              options={SEMESTRE_INICIAL_OPTIONS}
              value={semestreInicial}
              onValueChange={setSemestreInicial}
              disabled={satisfaceRequisitos}
              id="semestre-inicial-select"
              placeholder="Selecciona el semestre inicial"
              containerClassName="flex-1 lg:max-w-60"
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 gap-2">
            <Button onClick={onGenerate} disabled={satisfaceRequisitos}>
              <SchoolIcon />
              <span>Generar Plan</span>
            </Button>

            <PDFDownloadLink
              document={<PlanPdf plan={plan} />}
              fileName={PDF_FILE_NAME}
            >
              <Button variant="outline" disabled={!plan}>
                <PdfIcon />
                <span>Descargar Plan</span>
              </Button>
            </PDFDownloadLink>
          </div>
        </div>
      </ScreenHeader>

      <HowPlanGenerationWorksModal open={show} onClose={closeModal} />
    </>
  );
};
