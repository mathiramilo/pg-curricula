import { Header, SideBar } from './components';
import { MainLayout } from './layouts';
import { Router } from './router';

const App = () => {
  return (
    <div className="flex h-screen w-screen">
      <SideBar />
      <MainLayout>
        <Header />
        <Router />
      </MainLayout>
    </div>
  );
};

export default App;
