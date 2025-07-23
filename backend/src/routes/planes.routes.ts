import { Router } from "express";

import {
  generarListadoUCsController,
  generarPlanController,
} from "@/controllers";

export const planesRouter = Router();

planesRouter.post("/", generarPlanController);
planesRouter.post("/generar-listado", generarListadoUCsController);
