import { useState } from "react";

import iconFing from "@/assets/fing.svg";
import { ModalSubirArchivo } from "@/modals";
import { Button, DownloadIcon, RestartIcon, UploadIcon } from ".";

export const NavBar = () => {
  const [abrirModal, setAbrirModal] = useState(false);

  const cerrarModal = () => {
    setAbrirModal(false);
  };

  return (
    <>
      <header className="flex w-full justify-between border-b border-borde bg-white px-5 py-3">
        <div className="flex items-center gap-2">
          <img src={iconFing} alt="Logo" className="size-6" />
          <span className="font-medium">PG Curricula</span>
        </div>

        <nav className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setAbrirModal(true);
            }}
          >
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

      <ModalSubirArchivo abrirModal={abrirModal} cerrarModal={cerrarModal} />
    </>
  );
};
