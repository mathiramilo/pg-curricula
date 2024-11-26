import { Header, SideBar } from './components';
import { MainLayout } from './layouts';
import { Router } from './router';

import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.container}>
      <SideBar />
      <MainLayout>
        <Header />
        <Router />
      </MainLayout>
    </div>
  );
};

export default App;
