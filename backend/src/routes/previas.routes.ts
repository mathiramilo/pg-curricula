import { Router } from 'express';

import { chequearPreviasController } from '../controllers';

const router = Router();

router.get('/cumple-previas/:nombreUC', chequearPreviasController);

export default router;
