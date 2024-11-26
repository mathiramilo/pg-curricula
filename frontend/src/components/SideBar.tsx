import { NavLink } from 'react-router-dom';
import { LoopIcon, ProgressIcon, MenuIcon, HomeIcon, Button } from '.';

import { RUTAS } from '../router';

export const SideBar = () => {
  return (
    <aside className="bg-primary p-5 flex flex-col items-center justify-between">
      <div className="flex flex-col gap-4">
        <NavLink to={RUTAS.BASE}>
          <Button size="sm" className="hover:bg-white/10 w-full justify-start">
            <HomeIcon /> Inicio
          </Button>
        </NavLink>
        <NavLink to={RUTAS.BUSQUEDA}>
          <Button size="sm" className="hover:bg-white/10 w-full justify-start">
            <LoopIcon /> Buscar
          </Button>
        </NavLink>
        <NavLink to={RUTAS.SIGUIENTE_SEMESTRE}>
          <Button size="sm" className="hover:bg-white/10 w-full justify-start">
            <MenuIcon /> Semestre
          </Button>
        </NavLink>
        <NavLink to={RUTAS.TRAYECTORIA}>
          <Button size="sm" className="hover:bg-white/10 w-full justify-start">
            <ProgressIcon /> Trayectoria
          </Button>
        </NavLink>
      </div>
    </aside>
  );
};
