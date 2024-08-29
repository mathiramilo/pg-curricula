import { Router } from 'express';

import { procesarEscolaridad } from '../controllers/escolaridad.controller';
import { upload } from '../lib/upload';

const router = Router();

router.post('/procesar-escolaridad', upload.single('pdf'), procesarEscolaridad);

export default router;
