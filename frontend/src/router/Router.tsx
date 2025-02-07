import { Navigate, Route, Routes } from "react-router-dom";

import {
  BusquedaScreen,
  GrupoScreen,
  InicioScreen,
  ProgresoScreen,
  SiguienteSemestreScreen,
  TrayectoriaScreen,
} from "@/screens";
import { RUTAS } from ".";

export const Router = () => {
  return (
    <Routes>
      <Route index element={<InicioScreen />} />
      <Route path={RUTAS.BUSQUEDA} element={<BusquedaScreen />} />
      <Route path={RUTAS.GRUPO} element={<GrupoScreen />} />
      <Route path={RUTAS.PROGRESO} element={<ProgresoScreen />} />
      <Route
        path={RUTAS.SIGUIENTE_SEMESTRE}
        element={<SiguienteSemestreScreen />}
      />
      <Route path={RUTAS.TRAYECTORIA} element={<TrayectoriaScreen />} />

      <Route path="*" element={<Navigate to={RUTAS.BASE} />} />
    </Routes>
  );
};
