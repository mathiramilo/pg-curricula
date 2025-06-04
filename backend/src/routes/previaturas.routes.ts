import { Router } from 'express';

import {
  obtenerPreviasController,
  satisfacePreviasController,
} from '../controllers';

export const previaturasRouter = Router();

previaturasRouter.get('/:codigo', obtenerPreviasController);
previaturasRouter.post('/:codigo/satisface', satisfacePreviasController);
