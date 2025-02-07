import { Router } from 'express';

import { chequearPreviasController } from '../controllers';

const router = Router();

router.get('/cumple/:nombreUC', chequearPreviasController);

export default router;
