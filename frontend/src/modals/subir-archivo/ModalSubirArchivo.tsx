import { useState } from 'react';

import { procesarEscolaridad } from '../../api';
import { CloseIocn, DropdownIcon } from '../../components';

import styles from './ModalSubirArchivo.module.css';
import { useProcesarEscolaridad } from '../../hooks/useProcesarEscolaridad';

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
    isLoading,
    data,
    isSuccess,
    error,
  } = useProcesarEscolaridad();

  const manejarCambioDeArchivo = (
    evento: React.ChangeEvent<HTMLInputElement>
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
    formData.append('pdf', archivo);

    procesarEscolaridad(formData);

    if (isSuccess) {
      console.log('Datos: ', data);
    } else {
      console.log('Error: ', error);
    }
  };

  return (
    abrirModal && (
      <div className={styles.subirArchivoModal}>
        <div className={styles.modalContent}>
          <div className={styles.headerCargarProgreso}>
            <h2>Cargar Progreso</h2>
            <CloseIocn onClick={cerrarModal} className={styles.closeButton} />
          </div>
          <p className={styles.subtitulo}>Subir escolaridad en formato PDF</p>
          <div
            className={`${styles.dropZone} ${
              isDragging ? styles.dropZoneActiva : ''
            }`}
            onDragOver={manejarDragOver}
            onDrop={manejarDrop}
            onDragLeave={manejarDragLeave}
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            <DropdownIcon className={styles.iconDrop} />
            {nombreArchivo ? (
              <div>
                <p className={styles.nombreArchivo}>
                  Archivo seleccionado correctamente
                </p>
                <p className={styles.label}>{nombreArchivo}</p>
              </div>
            ) : (
              <div>
                <p className={styles.label}>
                  Haz click aquí para subir un archivo o arrástralo
                </p>
                <p className={styles.subtitulo}>Tamaño máximo 50MB</p>
              </div>
            )}
            <input
              id="fileInput"
              type="file"
              onChange={manejarCambioDeArchivo}
              accept="application/pdf"
              style={{ display: 'none' }}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button
              onClick={manejarEnvio}
              className={styles.buttonCargar}
              disabled={!archivo}
            >
              Cargar Progreso
            </button>
          </div>
        </div>
      </div>
    )
  );
};
