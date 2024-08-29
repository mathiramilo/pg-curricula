import { Router } from 'express';

import { chequearPrevias } from '../controllers/previas.controller';

const router = Router();

router.get('/', chequearPrevias);

export default router;
