import { Router } from "express";

import {
  generarListadoUCsController,
  generarPlanController,
} from "@/controllers";

export const planesRouter = Router();

planesRouter.get("/", generarPlanController);
planesRouter.get("/generar-listado", generarListadoUCsController);
