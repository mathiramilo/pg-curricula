import type { ComponentPropsWithoutRef } from "react";
import { NavLink } from "react-router-dom";

import { FEEDBACK_FORM_URL } from "@/config";
import { ROUTES } from "@/router";
import { cn } from "@/utils";
import {
  AcademicCapIcon,
  BookIcon,
  Button,
  CompassIcon,
  HomeIcon,
  ListSearchIcon,
  Logo,
  SpeakerphoneIcon,
} from ".";

export const SideBar = () => {
  return (
    <>
      <SideBarDesktop className="hidden md:flex" />
      <SideBarMobile className="md:hidden" />
    </>
  );
};

const SideBarDesktop = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"aside">) => (
  <aside
    className={cn("bg-principal p-4 flex-col gap-5 ", className)}
    {...props}
  >
    <Logo
      className="p-4 rounded-xl gap-3"
      imgClassName="size-8"
      textClassName="text-slate-50 text-xl"
    />

    <div className="flex flex-col justify-between h-full gap-5">
      <nav className="flex flex-col gap-4">
        <NavLink to={ROUTES.INICIO}>
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

        <NavLink to={ROUTES.BUSCAR_CURSOS}>
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

        <NavLink to={ROUTES.MI_PLAN}>
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

        <NavLink to={ROUTES.OFERTA_ACADEMICA}>
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

        <NavLink to={ROUTES.RESUMEN_CARRERA}>
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
    </div>
  </aside>
);

const SideBarMobile = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => (
  <div
    className={cn(
      "fixed bottom-4 inset-x-4 bg-principal py-4 px-6 z-50 rounded-xl max-w-lg mx-auto",
      className,
    )}
    {...props}
  >
    <nav className="flex items-center justify-between gap-4">
      <NavLink
        to={ROUTES.INICIO}
        className={({ isActive }) =>
          cn("rounded-lg p-3 transition-all", isActive && "bg-principal-400")
        }
      >
        <HomeIcon className="size-6 text-white/90" />
      </NavLink>

      <NavLink
        to={ROUTES.BUSCAR_CURSOS}
        className={({ isActive }) =>
          cn("rounded-lg p-3 transition-all", isActive && "bg-principal-400")
        }
      >
        <ListSearchIcon className="size-6 text-white/90" />
      </NavLink>

      <NavLink
        to={ROUTES.MI_PLAN}
        className={({ isActive }) =>
          cn("rounded-lg p-3 transition-all", isActive && "bg-principal-400")
        }
      >
        <CompassIcon className="size-6 text-white/90" />
      </NavLink>

      <NavLink
        to={ROUTES.OFERTA_ACADEMICA}
        className={({ isActive }) =>
          cn("rounded-lg p-3 transition-all", isActive && "bg-principal-400")
        }
      >
        <BookIcon className="size-6 text-white/90" />
      </NavLink>

      <NavLink
        to={ROUTES.RESUMEN_CARRERA}
        className={({ isActive }) =>
          cn("rounded-lg p-3 transition-all", isActive && "bg-principal-400")
        }
      >
        <AcademicCapIcon className="size-6 text-white/90" />
      </NavLink>
    </nav>
  </div>
);
