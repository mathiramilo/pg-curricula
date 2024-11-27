import { NavLink } from "react-router-dom";

import { RUTAS } from "@/router";
import { Button, HomeIcon, LoopIcon, MenuIcon, ProgressIcon } from ".";

export const SideBar = () => {
  return (
    <aside className="bg-principal p-4">
      <nav className="flex flex-col gap-4">
        <NavLink to={RUTAS.BASE}>
          <Button
            size="sm"
            className="w-full justify-start pr-12 text-white/90 hover:bg-principal-400"
          >
            <HomeIcon /> Inicio
          </Button>
        </NavLink>
        <NavLink to={RUTAS.BUSQUEDA}>
          <Button
            size="sm"
            className="w-full justify-start pr-12 text-white/90 hover:bg-principal-400"
          >
            <LoopIcon /> Busqueda
          </Button>
        </NavLink>
        <NavLink to={RUTAS.SIGUIENTE_SEMESTRE}>
          <Button
            size="sm"
            className="w-full justify-start pr-12 text-white/90 hover:bg-principal-400"
          >
            <MenuIcon /> Semestre
          </Button>
        </NavLink>
        <NavLink to={RUTAS.TRAYECTORIA}>
          <Button
            size="sm"
            className="w-full justify-start pr-12 text-white/90 hover:bg-principal-400"
          >
            <ProgressIcon /> Trayectoria
          </Button>
        </NavLink>
      </nav>
    </aside>
  );
};
