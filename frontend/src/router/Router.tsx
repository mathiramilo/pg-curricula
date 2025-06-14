import { Navigate, Route, Routes } from "react-router-dom";

import {
  BuscarCursosScreen,
  GrupoScreen,
  InicioScreen,
  MiPlanScreen,
  OfertaAcademicaScreen,
  ResumenCarreraScreen,
} from "@/screens";
import { ROUTES } from ".";

export const Router = () => {
  return (
    <Routes>
      <Route index element={<InicioScreen />} />

      <Route path={ROUTES.BUSCAR_CURSOS} element={<BuscarCursosScreen />} />

      <Route path={ROUTES.MI_PLAN} element={<MiPlanScreen />} />

      <Route
        path={ROUTES.OFERTA_ACADEMICA}
        element={<OfertaAcademicaScreen />}
      />

      <Route path={ROUTES.RESUMEN_CARRERA} element={<ResumenCarreraScreen />} />

      <Route path={ROUTES.GRUPO} element={<GrupoScreen />} />

      <Route path="*" element={<Navigate to={ROUTES.INICIO} />} />
    </Routes>
  );
};
