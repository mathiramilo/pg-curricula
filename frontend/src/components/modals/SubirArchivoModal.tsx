import { toast } from "sonner";

import {
  AlertTriangleIcon,
  Button,
  ConfettiIcon,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  JsonIcon,
  PdfIcon,
  UploadIcon,
} from "@/components";
import { useDropzone, useProcesarEscolaridad } from "@/hooks";
import type { InformacionEstudiante } from "@/models";
import { useInformacionEstudianteStore } from "@/store";
import { cn } from "@/utils";

interface ModalSubirArchivoProps {
  open: boolean;
  onClose: () => void;
}

export const SubirArchivoModal = ({
  open,
  onClose,
}: ModalSubirArchivoProps) => {
  const setInformacionEstudiante = useInformacionEstudianteStore(
    (state) => state.setInformacionEstudiante,
  );

  const {
    dragOver,
    file,
    error,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileChange,
    reset,
  } = useDropzone();

  const { mutate, isPending } = useProcesarEscolaridad();

  const handleUpload = () => {
    if (!file) return;

    const isJson = file.type === "application/json";

    if (isJson) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = event.target?.result as string;

        try {
          const parsedData = JSON.parse(data) as InformacionEstudiante;
          setInformacionEstudiante(parsedData);
          toast.success("Tu progreso ha sido cargado correctamente", {
            icon: <ConfettiIcon className="size-5" />,
            description: "Ya puedes empezar a utilizar la app!",
          });
          reset();
          onClose();
        } catch (error) {
          console.error("Error: ", error);
        }
      };

      reader.readAsText(file);
    } else {
      const formData = new FormData();
      formData.append("file", file);

      mutate(formData, {
        onSuccess: (data) => {
          setInformacionEstudiante(data);
          toast.success("Tu escolaridad ha sido cargada correctamente", {
            icon: <ConfettiIcon className="size-5" />,
            description: "Ya puedes empezar a utilizar la app!",
          });
          reset();
          onClose();
        },
        onError: (error) => {
          toast.error("Ha ocurrido un error al procesar tu escolaridad", {
            icon: <AlertTriangleIcon className="size-5" />,
            description: "Por favor intenta nuevamente en unos minutos.",
          });
          console.error("Error: ", error);
        },
      });
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-slate-50 gap-16 sm:gap-6">
        <DialogHeader>
          <DialogTitle>Cargar Progreso</DialogTitle>
          <DialogDescription>
            Sube tu escolaridad en formato PDF o tu progreso previamente
            exportado en formato JSON.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1">
          <label htmlFor="file">
            <div
              className={cn(
                "w-full h-full gap-4 flex flex-col items-center justify-center px-6 py-24 rounded-lg border-2 border-dashed border-borde cursor-pointer transition-all",
                dragOver && "bg-principal-50 border-principal-200",
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {file && (
                <>
                  <div className="size-12 rounded-full flex items-center justify-center gap-2 bg-red-500">
                    {file.type === "application/pdf" ? (
                      <PdfIcon className="text-slate-50" />
                    ) : (
                      <JsonIcon className="text-slate-50" />
                    )}
                  </div>
                  <p className="text-center text-sm text-fuente-principal">
                    {file.name}
                  </p>
                </>
              )}

              {!file && (
                <>
                  <div className="size-12 rounded-full flex items-center justify-center gap-2 bg-principal">
                    <UploadIcon className="text-slate-50" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-center text-sm text-fuente-principal">
                      <span className="underline underline-offset-2">
                        Haz click para subir un archivo
                      </span>{" "}
                      o arrastralo
                    </p>
                    <p className="text-sm text-center text-fuente-secundario">
                      Tamaño máximo 50MB
                    </p>
                  </div>
                </>
              )}
            </div>

            <input
              type="file"
              id="file"
              accept=".pdf,.json,application/pdf,application/json"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {error && (
            <p className="mt-2 text-center text-sm text-red-600">{error}</p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isPending}>
            Cancelar
          </Button>
          <Button onClick={handleUpload} disabled={!file || isPending}>
            {isPending ? "Procesando..." : "Cargar Progreso"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
