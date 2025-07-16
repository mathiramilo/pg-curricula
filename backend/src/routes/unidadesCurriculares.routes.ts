import { Router } from "express";

import {
  obtenerTrayectoriaSugeridaController,
  obtenerUnidadesCurricularesController,
  obtenerUnidadesCurricularesObligatoriasController,
} from "@/controllers";

export const unidadesCurricularesRouter = Router();

unidadesCurricularesRouter.post("/", obtenerUnidadesCurricularesController);
unidadesCurricularesRouter.get(
  "/trayectoria-sugerida",
  obtenerTrayectoriaSugeridaController,
);
unidadesCurricularesRouter.get(
  "/obligatorias",
  obtenerUnidadesCurricularesObligatoriasController,
);
