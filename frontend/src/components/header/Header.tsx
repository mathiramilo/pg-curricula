import { useState } from 'react';

import { UploadIcon, DownloadIcon, RestartIcon } from '../../components';
import { ModalSubirArchivo } from '../../modals';
import iconFing from '../../assets/fing.svg';

import styles from './Header.module.css';

export const Header = () => {
  const [abrirModal, setabrirModal] = useState(false);

  const cerrarModal = () => {
    setabrirModal(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftContainer}>
        <img src={iconFing} alt="Logo" className={styles.logoFing} />
        <h3>PG Curricula</h3>
      </div>
      <div className={styles.iconContainer}>
        <div
          className={styles.iconButton}
          onClick={() => {
            setabrirModal(true);
          }}
        >
          <UploadIcon className={styles.iconsHeader} />
          <span className={styles.iconLabel}>Cargar Progreso</span>
        </div>
        <div
          className={styles.iconButton}
          onClick={() => {
            console.log('Descargar Progreso');
          }}
        >
          <DownloadIcon className={styles.iconsHeader} />
          <span className={styles.iconLabel}>Descargar Progreso</span>
        </div>
        <div
          className={styles.iconButton}
          onClick={() => {
            console.log('Reiniciar');
          }}
        >
          <RestartIcon className={styles.iconsHeader} />
          <span className={styles.iconLabel}>Reiniciar</span>
        </div>
      </div>
      <ModalSubirArchivo abrirModal={abrirModal} cerrarModal={cerrarModal} />
    </header>
  );
};
