import type { ComponentPropsWithoutRef } from "react";
import { NavLink } from "react-router-dom";

import { RUTAS } from "@/router";
import { cn } from "@/utils";
import {
  Button,
  HomeIcon,
  LoopIcon,
  MenuIcon,
  PathIcon,
  ProgressIcon,
} from ".";

export const SideBar = () => {
  return (
    <>
      <SideBarDesktop className="hidden sm:block" />
      <SideBarMobile className="sm:hidden" />
    </>
  );
};

const SideBarDesktop = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"aside">) => (
  <aside className={cn("bg-principal p-4", className)} {...props}>
    <nav className="flex flex-col gap-4">
      <NavLink to={RUTAS.BASE}>
        {({ isActive }) => (
          <Button
            size="sm"
            className={cn(
              "w-full justify-start pr-12 text-white/90 hover:bg-principal-400",
              isActive && "bg-principal-400",
            )}
          >
            <HomeIcon /> Inicio
          </Button>
        )}
      </NavLink>
      <NavLink to={RUTAS.BUSQUEDA}>
        {({ isActive }) => (
          <Button
            size="sm"
            className={cn(
              "w-full justify-start pr-12 text-white/90 hover:bg-principal-400",
              isActive && "bg-principal-400",
            )}
          >
            <LoopIcon /> Busqueda
          </Button>
        )}
      </NavLink>
      <NavLink to={RUTAS.SIGUIENTE_SEMESTRE}>
        {({ isActive }) => (
          <Button
            size="sm"
            className={cn(
              "w-full justify-start pr-12 text-white/90 hover:bg-principal-400",
              isActive && "bg-principal-400",
            )}
          >
            <MenuIcon /> Semestre
          </Button>
        )}
      </NavLink>
      <NavLink to={RUTAS.TRAYECTORIA}>
        {({ isActive }) => (
          <Button
            size="sm"
            className={cn(
              "w-full justify-start pr-12 text-white/90 hover:bg-principal-400",
              isActive && "bg-principal-400",
            )}
          >
            <PathIcon /> Trayectoria
          </Button>
        )}
      </NavLink>
      <NavLink to={RUTAS.PROGRESO}>
        {({ isActive }) => (
          <Button
            size="sm"
            className={cn(
              "w-full justify-start pr-12 text-white/90 hover:bg-principal-400",
              isActive && "bg-principal-400",
            )}
          >
            <ProgressIcon /> Progreso
          </Button>
        )}
      </NavLink>
    </nav>
  </aside>
);

const SideBarMobile = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => (
  <div
    className={cn(
      "fixed bottom-4 inset-x-4 bg-principal py-4 px-12 z-50 rounded-xl",
      className,
    )}
    {...props}
  >
    <nav className="flex items-center justify-between gap-4">
      <NavLink
        to={RUTAS.BASE}
        className={({ isActive }) =>
          cn("rounded-lg p-3 transition-all", isActive && "bg-principal-400")
        }
      >
        <HomeIcon className="size-6 text-white/90" />
      </NavLink>
      <NavLink
        to={RUTAS.BUSQUEDA}
        className={({ isActive }) =>
          cn("rounded-lg p-3 transition-all", isActive && "bg-principal-400")
        }
      >
        <LoopIcon className="size-6 text-white/90" />
      </NavLink>
      <NavLink
        to={RUTAS.SIGUIENTE_SEMESTRE}
        className={({ isActive }) =>
          cn("rounded-lg p-3 transition-all", isActive && "bg-principal-400")
        }
      >
        <MenuIcon className="size-6 text-white/90" />
      </NavLink>
      <NavLink
        to={RUTAS.TRAYECTORIA}
        className={({ isActive }) =>
          cn("rounded-lg p-3 transition-all", isActive && "bg-principal-400")
        }
      >
        <PathIcon className="size-6 text-white/90" />
      </NavLink>
      <NavLink
        to={RUTAS.PROGRESO}
        className={({ isActive }) =>
          cn("rounded-lg p-3 transition-all", isActive && "bg-principal-400")
        }
      >
        <ProgressIcon className="size-6 text-white/90" />
      </NavLink>
    </nav>
  </div>
);
