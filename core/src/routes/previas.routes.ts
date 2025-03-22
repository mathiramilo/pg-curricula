import { Router } from 'express';

import {
  obtenerPreviasController,
  satisfacePreviasController,
} from '../controllers';

const router = Router();

router.get('/:codigoEnServicioUC', obtenerPreviasController);
router.post('/:codigoEnServicioUC/satisface', satisfacePreviasController);

export default router;
