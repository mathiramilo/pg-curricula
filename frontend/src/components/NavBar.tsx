import { useBoolean } from "@/hooks";
import {
  Button,
  DownloadIcon,
  DownloadProgressAlert,
  ResetProgressAlert,
  RestartIcon,
  SubirArchivoModal,
  UploadIcon,
} from ".";

export const NavBar = () => {
  const {
    value: showModal,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean(false);
  const {
    value: showDownloadAlert,
    setTrue: openDownloadAlert,
    setFalse: closeDownloadAlert,
  } = useBoolean(false);
  const {
    value: showResetAlert,
    setTrue: openResetAlert,
    setFalse: closeResetAlert,
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
            <UploadIcon />{" "}
            <span className="hidden md:inline-block">Cargar Progreso</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={openDownloadAlert}>
            <DownloadIcon />
            <span className="hidden md:inline-block">Descargar Progreso</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={openResetAlert}>
            <RestartIcon />
            <span className="hidden md:inline-block">Reiniciar</span>
          </Button>
        </nav>
      </header>

      <SubirArchivoModal open={showModal} onClose={closeModal} />
      <DownloadProgressAlert
        open={showDownloadAlert}
        onClose={closeDownloadAlert}
      />
      <ResetProgressAlert open={showResetAlert} onClose={closeResetAlert} />
    </>
  );
};
