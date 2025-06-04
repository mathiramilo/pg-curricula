import { Navigate, Route, Routes } from "react-router-dom";

import {
  BuscarCursosScreen,
  GrupoScreen,
  InicioScreen,
  MiPlanScreen,
  OfertaAcademicaScreen,
  ResumenCarreraScreen,
} from "@/screens";
import { RUTAS } from ".";

export const Router = () => {
  return (
    <Routes>
      <Route index element={<InicioScreen />} />

      <Route path={RUTAS.BUSCAR_CURSOS} element={<BuscarCursosScreen />} />

      <Route path={RUTAS.MI_PLAN} element={<MiPlanScreen />} />

      <Route
        path={RUTAS.OFERTA_ACADEMICA}
        element={<OfertaAcademicaScreen />}
      />

      <Route path={RUTAS.RESUMEN_CARRERA} element={<ResumenCarreraScreen />} />

      <Route path={RUTAS.GRUPO} element={<GrupoScreen />} />

      <Route path="*" element={<Navigate to={RUTAS.INICIO} />} />
    </Routes>
  );
};
