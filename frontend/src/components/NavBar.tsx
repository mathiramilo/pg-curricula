import { useBoolean } from "@/hooks";
import {
  Button,
  DownloadIcon,
  DownloadProgressAlert,
  Logo,
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
      <header className="flex w-full justify-between items-center border-b border-borde bg-white px-5 py-3">
        <Logo className="md:hidden" />

        <p className="font-light text-fuente-principal text-sm hidden md:inline-block line-clamp-1 h-5">
          Ingeniería en Computación
        </p>

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
