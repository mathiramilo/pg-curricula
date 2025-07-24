import { Router } from "express";

import {
  generarListadoUCsController,
  generarPlanController,
  inicializarListadoUCsController,
} from "@/controllers";

export const planesRouter = Router();

planesRouter.post("/", generarPlanController);
planesRouter.post("/inicializar-listado", inicializarListadoUCsController);
planesRouter.post("/generar-listado", generarListadoUCsController);
