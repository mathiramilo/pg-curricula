import { Router } from 'express';

import { checkPrevs } from '../controllers/prevs.controller';

const router = Router();

router.get('/', checkPrevs);

export default router;
