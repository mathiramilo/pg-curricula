import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components";

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
            A continuación te explicamos cómo funciona la generación de tu
            trayectoria académica.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center mb-4">Paso a paso</div>

        <DialogFooter className="mt-auto">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
