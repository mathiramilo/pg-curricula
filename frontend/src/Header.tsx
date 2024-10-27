import { useState } from 'react';
import styles from './styles/App.module.css';
import iconFing from './assets/iconFing.svg';
import iconUpload from './assets/iconUpload.svg';
import iconDownload from './assets/iconDownload.svg';
import iconRestar from './assets/iconRestart.svg';
import ModalSubirArchivo from './ModalSubirArchivo';

function Header() {
  const [abrirModal, setabrirModal] = useState(false);

  const cerrarModal = () => {
    setabrirModal(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftContainer}>
        <img 
          src={iconFing} 
          alt="Logo" 
          className={styles.logoFing} />
        <h3>PG Curricula</h3>
      </div>
      <div className={styles.iconContainer}>
        <div className={styles.iconButton} onClick={()=> {setabrirModal(true)}}>
          <img 
            src={iconUpload} 
            className={styles.iconsHeader} 
            alt="Cargar Progreso" />
          <span className={styles.iconLabel}>Cargar Progreso</span>
        </div>
        <div className={styles.iconButton} onClick={() => { console.log('Descargar Progreso'); }}>
          <img 
            src={iconDownload} 
            className={styles.iconsHeader} 
            alt="Descargar Progreso" />
          <span className={styles.iconLabel}>Descargar Progreso</span>
        </div>
        <div className={styles.iconButton} onClick={() => { console.log('Reiniciar'); }}>
          <img 
            src={iconRestar} 
            className={styles.iconsHeader} 
            alt="Reiniciar" />
          <span className={styles.iconLabel}>Reiniciar</span>
        </div>
      </div>
      <ModalSubirArchivo
        abrirModal={abrirModal}
        cerrarModal={cerrarModal}
      />
    </header>
  );
}

export default Header;
