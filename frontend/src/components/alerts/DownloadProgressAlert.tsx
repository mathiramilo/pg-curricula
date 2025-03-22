import React, { useEffect, useState } from "react";

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

interface DownloadProgressAlertProps {
  open: boolean;
  onClose: () => void;
}

export const DownloadProgressAlert = ({
  open,
  onClose,
}: DownloadProgressAlertProps) => {
  const informacionEstudiante = useInformacionEstudianteStore(
    (state) => state.informacionEstudiante,
  );

  const [downloadUrl, setDownloadUrl] = useState("");

  useEffect(() => {
    const jsonString = JSON.stringify(informacionEstudiante, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [informacionEstudiante]);

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
          <AlertDialogAction asChild disabled={!downloadUrl}>
            <a href={downloadUrl} download="informacion-estudiante.json">
              Descargar Progreso
            </a>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
