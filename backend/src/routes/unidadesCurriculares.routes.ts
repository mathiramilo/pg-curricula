import { Router } from 'express';

import {
  obtenerUnidadesCurricularesController,
  obtenerTrayectoriaSugeridaController,
} from '../controllers';

export const unidadesCurricularesRouter = Router();

unidadesCurricularesRouter.post('/', obtenerUnidadesCurricularesController);
unidadesCurricularesRouter.get(
  '/trayectoria-sugerida',
  obtenerTrayectoriaSugeridaController
);
