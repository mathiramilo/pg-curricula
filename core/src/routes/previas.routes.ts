import { Router } from 'express';

import { satisfacePreviasController } from '../controllers';

const router = Router();

router.post('/:codigoEnServicioUC/satisface', satisfacePreviasController);

export default router;
