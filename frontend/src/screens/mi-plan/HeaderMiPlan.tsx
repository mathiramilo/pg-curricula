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
  TotalProgress
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
  activeView: string;
  onViewChange: (view: "plan-estudios" | "seleccionar-cursos") => void;
}

export const HeaderMiPlan = ({ onGenerate, activeView, onViewChange }: HeaderMiPlanProps) => {
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
        <div className="flex justify-center gap-4">
          <Button
            variant={activeView === "plan-estudios" ? "default" : "outline"}
            onClick={() => onViewChange("plan-estudios")}
          >
            Plan de Estudios
          </Button>
          <Button
            variant={activeView === "seleccionar-cursos" ? "default" : "outline"}
            onClick={() => onViewChange("seleccionar-cursos")}
          >
            Seleccionar Cursos
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          {/* Subtítulo dinámico */}
          <h2 className="font-medium text-fuente-principal">
            {activeView === "plan-estudios"
              ? "Plan de estudios"
              : "Seleccionar cursos"}
          </h2>

          {/* Botones contextuales */}
          <div className="mt-2 lg:mt-0 flex gap-2">
            {activeView === "plan-estudios" ? (
              <>
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
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => console.log("Generar al azar")}>
                  Generar selección al azar
                </Button>
                <Button variant="destructive" onClick={() => console.log("Reiniciar selección")}>
                  Reiniciar selección
                </Button>
              </>
            )}
          </div>
        </div>

        {activeView === "plan-estudios" ? (
          <div className="flex gap-4">
            <SelectField
              label="Créditos por semestre:"
              options={CREDITOS_POR_SEMESTRE_OPTIONS}
              value={creditos}
              onValueChange={setCreditos}
              disabled={satisfaceRequisitos}
              id="creditos-select"
              placeholder="Selecciona una cantidad de créditos"
              containerClassName="flex-1"
            />

            <SelectField
              label="Semestre de inicio:"
              options={SEMESTRE_INICIAL_OPTIONS}
              value={semestreInicial}
              onValueChange={setSemestreInicial}
              disabled={satisfaceRequisitos}
              id="semestre-inicial-select"
              placeholder="Selecciona el semestre inicial"
              containerClassName="flex-1"
            />
          </div>
        ) : (
          <>
            <div className="mb-4">
              <TotalProgress />
            </div>
          </>
        )}
      </ScreenHeader>

      <HowPlanGenerationWorksModal open={show} onClose={closeModal} />
    </>
  );
};
