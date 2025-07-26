import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components";

const steps = [
  {
    title: "Selección de cursos",
    description:
      "Debes seleccionar una combinación de cursos válidos que cumplan con los requisitos de la carrera. Puedes ayudarte con la opción de completar automáticamente.",
  },
  {
    title: "Organización por semestres",
    description:
      "Ordenamos los cursos seleccionados respetando el máximo de créditos por semestre que configuraste.",
  },
  {
    title: "Optimización del tiempo",
    description:
      "Permitimos algunos créditos extra si eso reduce significativamente la duración de tu carrera.",
  },
  {
    title: "Presentación y descarga",
    description:
      "Te mostramos el plan completo y te damos la opción de descargarlo en PDF.",
  },
];

interface HowPlanGenerationWorksModalProps {
  open: boolean;
  onClose: () => void;
}

export const HowPlanGenerationWorksModal = ({
  open,
  onClose,
}: HowPlanGenerationWorksModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-50 justify-start">
        <DialogHeader>
          <DialogTitle>¿Cómo funciona?</DialogTitle>
          <DialogDescription>
            A continuación te explicamos cómo funciona la generación de tu plan
            de estudios.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center mb-4">
          <Timeline>
            {steps.map(({ title, description }, index) => (
              <TimelineItem key={index}>
                <TimelineDot />
                <TimelineSeparator />
                <TimelineContent>
                  <TimelineTitle>{title}</TimelineTitle>
                  <TimelineDescription>{description}</TimelineDescription>
                </TimelineContent>
                {index !== steps.length - 1 && <TimelineSeparator />}
              </TimelineItem>
            ))}
          </Timeline>
        </div>

        <DialogFooter className="mt-auto">
          <Button variant="outline" onClick={onClose}>
            Entendido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
