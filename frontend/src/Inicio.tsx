import React from 'react';
import Header from './Header';
import styles from './styles/App.module.css';

function Inicio() {
  return (
    <div className={styles.mainContent}>
      <Header />
      <main className={styles.content}>
        <p>Contenido principal va aquí.</p>
      </main>
    </div>
  );
}

export default Inicio;
