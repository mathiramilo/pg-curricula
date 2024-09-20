import { Router } from 'express';

import { chequearPrevias } from '../controllers';

const router = Router();

router.get('/cumple-previas/:nombreUC', chequearPrevias);

export default router;
