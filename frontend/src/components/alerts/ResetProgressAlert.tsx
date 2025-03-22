import React from "react";

import { useInformacionEstudianteStore } from "@/store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui";

interface ResetProgressAlertProps {
  open: boolean;
  onClose: () => void;
}

export const ResetProgressAlert = ({
  open,
  onClose,
}: ResetProgressAlertProps) => {
  const resetInformacionEstudiante = useInformacionEstudianteStore(
    (state) => state.resetInformacionEstudiante,
  );

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de que quieres reiniciar tu progreso?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Puedes subir tu escolaridad nuevamente como punto de partida pero
            perderás toda la información que has cargado hasta el momento.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={resetInformacionEstudiante}
          >
            Reiniciar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
