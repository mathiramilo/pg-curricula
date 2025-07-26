import { Router } from "express";

import {
  obtenerPreviaturasController,
  satisfacePreviaturasController,
} from "@/controllers";

export const previaturasRouter = Router();

previaturasRouter.get("/:codigo", obtenerPreviaturasController);
previaturasRouter.post("/:codigo/satisface", satisfacePreviaturasController);
