import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components";
import { FEEDBACK_FORM_URL } from "@/config";
import { useFeedbackTimer } from "@/hooks";

export const AskForFeedbackModal = () => {
  const { showModal, closeModal } = useFeedbackTimer();

  return (
    <Dialog open={showModal} onOpenChange={closeModal}>
      <DialogContent className="bg-slate-50 justify-start">
        <DialogHeader>
          <DialogTitle>¿Qué te está pareciendo la plataforma?</DialogTitle>
          <DialogDescription>
            Tu feedback es muy importante para nosotros. Por favor, envíanos tus
            comentarios y sugerencias para mejorar la plataforma.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center mb-4">
          <img
            src="/images/feedback-illustration.png"
            alt="Ilustracion de Enviar Feedback"
            className="w-2/3"
          />
        </div>

        <DialogFooter className="mt-auto">
          <Button onClick={closeModal} asChild>
            <a href={FEEDBACK_FORM_URL} target="_blank" rel="noreferrer">
              Enviar Feedback
            </a>
          </Button>
          <Button variant="outline" onClick={closeModal}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
