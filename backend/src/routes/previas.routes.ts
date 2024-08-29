import { Router } from 'express';

import { chequearPrevias } from '../controllers/previas.controller';

const router = Router();

router.get('/cumple-previas/:nombreUC', chequearPrevias);

export default router;
