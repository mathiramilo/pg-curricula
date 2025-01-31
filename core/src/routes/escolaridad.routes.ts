import { Router } from 'express';

import { procesarEscolaridadController } from '../controllers';
import { upload } from '../lib';

const router = Router();

router.post(
  '/procesar-escolaridad',
  upload.single('pdf'),
  procesarEscolaridadController
);

export default router;
