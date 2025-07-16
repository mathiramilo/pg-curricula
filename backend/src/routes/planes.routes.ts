import { Router } from "express";

import { 
  generarPlanController,
  obtenerUnidadesCurricularesParaPlanController,
} from "@/controllers";

export const planesRouter = Router();

planesRouter.get("/", generarPlanController);
planesRouter.get("/unidades-curriculares", obtenerUnidadesCurricularesParaPlanController);
