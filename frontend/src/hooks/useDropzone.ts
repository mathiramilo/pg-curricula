import { useState } from "react";

export const useDropzone = () => {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    validateFile(selectedFile);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);

    const droppedFile = event.dataTransfer.files?.[0];
    validateFile(droppedFile);
  };

  const validateFile = (file: File | undefined) => {
    if (!file) {
      setError("No se ha seleccionado ningún archivo");
      return;
    }

    if (file.type !== "application/pdf" && file.type !== "application/json") {
      setError("Solo se permiten archivos PDF o JSON");
      setFile(null);
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError("El archivo supera el tamaño máximo permitido (50MB)");
      setFile(null);
      return;
    }

    setError(null);
    setFile(file);
  };

  const reset = () => {
    setFile(null);
    setError(null);
  };

  return {
    dragOver,
    file,
    error,
    handleFileChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    reset,
  };
};
