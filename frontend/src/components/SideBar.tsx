import type { ComponentPropsWithoutRef } from "react";
import { NavLink } from "react-router-dom";

import { FEEDBACK_FORM_URL } from "@/config";
import { RUTAS } from "@/router";
import { cn } from "@/utils";
import {
  AcademicCapIcon,
  BookIcon,
  Button,
  CompassIcon,
  HomeIcon,
  ListSearchIcon,
  SpeakerphoneIcon,
} from ".";

export const SideBar = () => {
  return (
    <>
      <SideBarDesktop className="hidden sm:flex" />
      <SideBarMobile className="sm:hidden" />
    </>
  );
};

const SideBarDesktop = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"aside">) => (
  <aside
    className={cn("bg-principal p-4 flex-col justify-between", className)}
    {...props}
  >
    <nav className="flex flex-col gap-4">
      <NavLink to={RUTAS.INICIO}>
        {({ isActive }) => (
          <Button
            size="sm"
            className={cn(
              "w-full justify-start pr-12 text-white/90 enabled:hover:bg-principal-400",
              isActive && "bg-principal-400",
            )}
          >
            <HomeIcon /> Inicio
          </Button>
        )}
      </NavLink>

      <NavLink to={RUTAS.BUSCAR_CURSOS}>
        {({ isActive }) => (
          <Button
            size="sm"
            className={cn(
              "w-full justify-start pr-12 text-white/90 enabled:hover:bg-principal-400",
              isActive && "bg-principal-400",
            )}
          >
            <ListSearchIcon /> Buscar Cursos
          </Button>
        )}
      </NavLink>

      <NavLink to={RUTAS.MI_PLAN}>
        {({ isActive }) => (
          <Button
            size="sm"
            className={cn(
              "w-full justify-start pr-12 text-white/90 enabled:hover:bg-principal-400",
              isActive && "bg-principal-400",
            )}
          >
            <CompassIcon /> Mi Plan
          </Button>
        )}
      </NavLink>

      <NavLink to={RUTAS.OFERTA_ACADEMICA}>
        {({ isActive }) => (
          <Button
            size="sm"
            className={cn(
              "w-full justify-start pr-12 text-white/90 enabled:hover:bg-principal-400",
              isActive && "bg-principal-400",
            )}
          >
            <BookIcon /> Oferta Académica
          </Button>
        )}
      </NavLink>

      <NavLink to={RUTAS.RESUMEN_CARRERA}>
        {({ isActive }) => (
          <Button
            size="sm"
            className={cn(
              "w-full justify-start pr-12 text-white/90 enabled:hover:bg-principal-400",
              isActive && "bg-principal-400",
            )}
          >
            <AcademicCapIcon /> Resumen Carrera
          </Button>
        )}
      </NavLink>
    </nav>

    <nav className="flex flex-col gap-4">
      <a href={FEEDBACK_FORM_URL} target="_blank" rel="noreferrer">
        <Button
          size="sm"
          className="w-full justify-start pr-12 text-white/90 enabled:hover:bg-principal-400"
        >
          <SpeakerphoneIcon /> Feedback
        </Button>
      </a>
    </nav>
  </aside>
);

const SideBarMobile = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => (
  <div
    className={cn(
      "fixed bottom-4 inset-x-4 bg-principal py-4 px-6 z-50 rounded-xl",
      className,
    )}
    {...props}
  >
    <nav className="flex items-center justify-between gap-4">
      <NavLink
        to={RUTAS.INICIO}
        className={({ isActive }) =>
          cn("rounded-lg p-3 transition-all", isActive && "bg-principal-400")
        }
      >
        <HomeIcon className="size-6 text-white/90" />
      </NavLink>

      <NavLink
        to={RUTAS.BUSCAR_CURSOS}
        className={({ isActive }) =>
          cn("rounded-lg p-3 transition-all", isActive && "bg-principal-400")
        }
      >
        <ListSearchIcon className="size-6 text-white/90" />
      </NavLink>

      <NavLink
        to={RUTAS.MI_PLAN}
        className={({ isActive }) =>
          cn("rounded-lg p-3 transition-all", isActive && "bg-principal-400")
        }
      >
        <CompassIcon className="size-6 text-white/90" />
      </NavLink>

      <NavLink
        to={RUTAS.OFERTA_ACADEMICA}
        className={({ isActive }) =>
          cn("rounded-lg p-3 transition-all", isActive && "bg-principal-400")
        }
      >
        <BookIcon className="size-6 text-white/90" />
      </NavLink>

      <NavLink
        to={RUTAS.RESUMEN_CARRERA}
        className={({ isActive }) =>
          cn("rounded-lg p-3 transition-all", isActive && "bg-principal-400")
        }
      >
        <AcademicCapIcon className="size-6 text-white/90" />
      </NavLink>
    </nav>
  </div>
);
