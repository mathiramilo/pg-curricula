import {
  AskForFeedbackModal,
  NavBar,
  SideBar,
  Toaster,
  UnidadCurricularModal,
} from "@/components";
import { Router } from "@/router";

const App = () => {
  return (
    <>
      <div className="flex h-screen w-full overflow-hidden">
        <SideBar />
        <div className="h-full w-full bg-slate-50 overflow-hidden">
          <NavBar />
          <Router />
        </div>
      </div>

      <UnidadCurricularModal />
      <AskForFeedbackModal />

      <Toaster />
    </>
  );
};

export default App;
