import { Router } from 'express';

import { procesarEscolaridad } from '../controllers';
import { upload } from '../lib';

const router = Router();

router.post('/procesar-escolaridad', upload.single('pdf'), procesarEscolaridad);

export default router;
