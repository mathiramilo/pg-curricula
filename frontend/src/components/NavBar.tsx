import { useBoolean } from "@/hooks";
import { SubirArchivoModal } from "@/modals";
import { Button, DownloadIcon, RestartIcon, UploadIcon } from ".";

export const NavBar = () => {
  const {
    value: isOpen,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean(false);

  return (
    <>
      <header className="flex w-full justify-between border-b border-borde bg-white px-5 py-3">
        <div className="flex items-center gap-2">
          <img src="/fing.svg" alt="Logo" className="size-6" />
          <span className="font-medium">PG Curricula</span>
        </div>

        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={openModal}>
            <UploadIcon /> Cargar Progreso
          </Button>
          <Button variant="ghost" size="sm">
            <DownloadIcon /> Descargar Progreso
          </Button>
          <Button variant="ghost" size="sm">
            <RestartIcon /> Reiniciar
          </Button>
        </nav>
      </header>

      <SubirArchivoModal show={isOpen} onClose={closeModal} />
    </>
  );
};
