import { Router } from 'express';
import multer from 'multer';

import { procesarEscolaridadController } from '../controllers';

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post('/procesar', upload.single('file'), procesarEscolaridadController);

export default router;
