import { PDFDownloadLink } from "@react-pdf/renderer";
import { toast } from "sonner";

import {
  AlertTriangleIcon,
  Button,
  ConfettiIcon,
  PdfIcon,
  PlanPdf,
  SchoolIcon,
  SelectField,
} from "@/components";
import { useGeneratePlan } from "@/hooks";
import {
  CREDITOS_POR_SEMESTRE_OPTIONS,
  SEMESTRE_INICIAL_OPTIONS,
} from "@/models";
import { useMiPlanStore } from "@/store";
import { PlanDisplay } from "./PlanDisplay";

const PDF_FILE_NAME = "plan-carrera-computacion.pdf";

export const PlanTab = () => {
  const {
    listadoUCs,
    creditos,
    setCreditos,
    plan,
    setPlan,
    semestreInicial,
    setSemestreInicial,
  } = useMiPlanStore();

  const { mutate, isPending, isError } = useGeneratePlan();

  const handleGenerate = () => {
    mutate(
      {
        creditosPorSemestre: Number(creditos),
        semestreInicial,
        listadoUCs,
      },
      {
        onError: () => {
          toast.error("Ha ocurrido un error al generar tu plan", {
            icon: <AlertTriangleIcon className="size-5" />,
            description: "Por favor intenta nuevamente en unos minutos.",
          });
        },
        onSuccess: (data) => {
          setPlan(data);

          toast.success("Tu plan ha sido generado con éxito", {
            icon: <ConfettiIcon className="size-5" />,
            description: "Ahora puedes explorarlo y descargarlo!",
          });
        },
      },
    );
  };

  return (
    <section className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
          <h2 className="text-xl font-medium">Plan de estudios</h2>

          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 gap-2">
            <Button onClick={handleGenerate} disabled={false}>
              <SchoolIcon />
              <span>{plan ? "Regenerar Plan" : "Generar Plan"}</span>
            </Button>

            <PDFDownloadLink
              document={<PlanPdf plan={plan} />}
              fileName={PDF_FILE_NAME}
            >
              <Button variant="outline" disabled={!plan} className="w-full">
                <PdfIcon />
                <span>Descargar Plan</span>
              </Button>
            </PDFDownloadLink>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-4 gap-2 flex-1">
          <SelectField
            label="Créditos por semestre:"
            options={CREDITOS_POR_SEMESTRE_OPTIONS}
            value={creditos}
            onValueChange={setCreditos}
            id="creditos-select"
            placeholder="Selecciona una cantidad de créditos"
            containerClassName="flex-1"
          />

          <SelectField
            label="Semestre de inicio:"
            options={SEMESTRE_INICIAL_OPTIONS}
            value={semestreInicial}
            onValueChange={setSemestreInicial}
            id="semestre-inicial-select"
            placeholder="Selecciona el semestre inicial"
            containerClassName="flex-1"
          />
        </div>
      </header>

      <PlanDisplay isPending={isPending} isError={isError} />
    </section>
  );
};
