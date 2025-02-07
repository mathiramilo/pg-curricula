import React from "react";

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

interface DownloadProgressAlertProps {
  open: boolean;
  onClose: () => void;
}

export const DownloadProgressAlert = ({
  open,
  onClose,
}: DownloadProgressAlertProps) => {
  const handleDownloadProgress = () => {
    console.log("Downloading progress JSON file...");
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Quieres descargar tu progreso?</AlertDialogTitle>
          <AlertDialogDescription>
            Tu progreso será guardado en un archivo JSON que luego podrás cargar
            para continuar donde quedaste.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDownloadProgress}>
            Descargar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
