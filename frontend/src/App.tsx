import { Header, SideBar } from './components';
import { MainLayout } from './layouts';
import { Inicio } from './screens';

import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.container}>
      <SideBar />
      <MainLayout>
        <Header />
        <Inicio />
      </MainLayout>
    </div>
  );
};

export default App;
