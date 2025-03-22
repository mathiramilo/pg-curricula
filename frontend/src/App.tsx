import { NavBar, SideBar, UnidadCurricularModal } from "@/components";
import { Router } from "@/router";

const App = () => {
  return (
    <>
      <div className="flex h-screen w-full overflow-hidden">
        <SideBar />
        <div className="h-full w-full bg-slate-50">
          <NavBar />
          <Router />
        </div>
      </div>

      <UnidadCurricularModal />
    </>
  );
};

export default App;
