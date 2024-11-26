import { useState } from "react";

import { Button, CloseIcon, DropdownIcon } from "@/components";
import { useProcesarEscolaridad } from "@/hooks";
import { cn } from "@/lib";

interface ModalSubirArchivoProps {
  abrirModal: boolean;
  cerrarModal: () => void;
}

export const ModalSubirArchivo = ({
  abrirModal,
  cerrarModal,
}: ModalSubirArchivoProps) => {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [nombreArchivo, setNombreArchivo] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const {
    mutateAsync: procesarEscolaridad,
    data,
    isSuccess,
    error,
  } = useProcesarEscolaridad();

  const manejarCambioDeArchivo = (
    evento: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (evento.target.files) {
      const archivoSeleccionado = evento.target.files[0];
      setArchivo(archivoSeleccionado);
      setNombreArchivo(archivoSeleccionado.name);
    }
  };

  const manejarDrop = (evento: React.DragEvent<HTMLDivElement>) => {
    evento.preventDefault();
    setIsDragging(false);
    if (evento.dataTransfer.files && evento.dataTransfer.files.length > 0) {
      const archivoSeleccionado = evento.dataTransfer.files[0];
      setArchivo(archivoSeleccionado);
      setNombreArchivo(archivoSeleccionado.name);
    }
  };

  const manejarDragOver = (evento: React.DragEvent<HTMLDivElement>) => {
    evento.preventDefault();
    setIsDragging(true);
  };

  const manejarDragLeave = () => {
    setIsDragging(false);
  };

  const manejarEnvio = (evento: React.FormEvent) => {
    evento.preventDefault();
    if (archivo) {
      subirPDF(archivo);
      cerrarModal();
    }
  };

  const subirPDF = async (archivo: File) => {
    const formData = new FormData();
    formData.append("pdf", archivo);

    procesarEscolaridad(formData);

    if (isSuccess) {
      console.log("Datos: ", data);
    } else {
      console.log("Error: ", error);
    }
  };

  return (
    abrirModal && (
      <div className="fixed flex h-screen w-full items-center justify-center bg-black/20">
        <div className="flex flex-col gap-5 rounded-lg bg-white p-4">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold">Cargar Progreso</h2>
              <p className="text-xs text-gray-400">
                Subir escolaridad en formato PDF
              </p>
            </div>
            <Button variant="ghost" size="icon">
              <CloseIcon onClick={cerrarModal} className="" />
            </Button>
          </div>
          <div
            className={cn(
              "flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-dashed border-slate-200 p-12 text-center transition-all",
              isDragging && "border-principal bg-principal/10",
            )}
            onDragOver={manejarDragOver}
            onDrop={manejarDrop}
            onDragLeave={manejarDragLeave}
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            <DropdownIcon className="size-9" />
            {nombreArchivo ? (
              <div>
                <p className="text-sm text-principal">
                  Archivo seleccionado correctamente
                </p>
                <p className="text-xs font-bold">{nombreArchivo}</p>
              </div>
            ) : (
              <div>
                <p className="text-xs font-bold">
                  Haz click aquí para subir un archivo o arrástralo
                </p>
                <p className="text-xs text-gray-400">Tamaño máximo 50MB</p>
              </div>
            )}
            <input
              id="fileInput"
              type="file"
              onChange={manejarCambioDeArchivo}
              accept="application/pdf"
              style={{ display: "none" }}
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={manejarEnvio} disabled={!archivo}>
              Cargar Progreso
            </Button>
          </div>
        </div>
      </div>
    )
  );
};
