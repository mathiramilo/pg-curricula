import { Router } from "express";

import {
  obtenerTrayectoriaSugeridaController,
  obtenerUnidadesCurricularesController,
} from "@/controllers";

export const unidadesCurricularesRouter = Router();

unidadesCurricularesRouter.post("/", obtenerUnidadesCurricularesController);
unidadesCurricularesRouter.get(
  "/trayectoria-sugerida",
  obtenerTrayectoriaSugeridaController,
);
