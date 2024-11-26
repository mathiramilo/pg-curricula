import { useState } from 'react';

import { UploadIcon, DownloadIcon, RestartIcon, Button } from '../components';
import { ModalSubirArchivo } from '../modals';
import iconFing from '../assets/fing.svg';

export const Header = () => {
  const [abrirModal, setabrirModal] = useState(false);

  const cerrarModal = () => {
    setabrirModal(false);
  };

  return (
    <header className="w-full flex justify-between bg-white px-5 py-3 border-b border-slate-100">
      <div className="flex">
        <img src={iconFing} alt="Logo" className="size-7" />
        <h3>PG Curricula</h3>
      </div>
      <div className="flex gap-x-2 items-center">
        <Button
          variant="ghost"
          size="sm"
          className=""
          onClick={() => {
            setabrirModal(true);
          }}
        >
          <UploadIcon className="size-5" />
          <span className="text-sm font-medium text-black">
            Cargar Progreso
          </span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className=""
          onClick={() => {
            console.log('Descargar Progreso');
          }}
        >
          <DownloadIcon className="size-5" />
          <span className="text-sm font-medium text-black">
            Descargar Progreso
          </span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className=""
          onClick={() => {
            console.log('Reiniciar');
          }}
        >
          <RestartIcon className="size-5" />
          <span className="text-sm font-medium text-black">Reiniciar</span>
        </Button>
      </div>
      <ModalSubirArchivo abrirModal={abrirModal} cerrarModal={cerrarModal} />
    </header>
  );
};
