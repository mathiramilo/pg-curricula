import Header from './Header';
import styles from './styles/Inicio.module.css';

function Inicio() {
  return (
    <div className={styles.mainContent}>
      <Header />
      <main className={styles.content}>
        <h2>Progreso de Carrera</h2>
        <div className={styles.progressBar}>
          <p style={{fontWeight: '600'}}>366 creditos</p>
          <progress value={10} max={100}></progress>
          <div style={{ display: 'flex'}}>
            <p style={{fontWeight: '600', paddingRight: '19px'}}>
              Matemática: <span color='#004A87 !important'>87/86</span>
            </p>
            <p style={{fontWeight: '600', paddingRight: '19px'}}>
              Programacion: 
            </p>
            <p style={{fontWeight: '600', paddingRight: '19px'}}>
              Programacion: 
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Inicio;
