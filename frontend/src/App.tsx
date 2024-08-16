import Sidebar from './SideBar';
import MainContent from './Inicio';
import styles from './styles/App.module.css';

function App() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;
