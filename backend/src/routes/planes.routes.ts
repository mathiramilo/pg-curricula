import { Router } from "express";

import {
  generarListadoUCsController,
  generarPlanController,
} from "@/controllers";

export const planesRouter = Router();

planesRouter.post("/", generarPlanController);
planesRouter.get("/generar-listado", generarListadoUCsController);
