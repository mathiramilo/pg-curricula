import { Router } from 'express';

import {
  obtenerPreviasController,
  satisfacePreviasController,
} from '../controllers';

const router = Router();

router.get('/:codigo', obtenerPreviasController);
router.post('/:codigo/satisface', satisfacePreviasController);

export default router;
