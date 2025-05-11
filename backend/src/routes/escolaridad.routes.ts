import { Router } from 'express';
import multer from 'multer';

import { procesarEscolaridadController } from '../controllers';

const upload = multer({ storage: multer.memoryStorage() });

export const escolaridadesRouter = Router();

escolaridadesRouter.post(
  '/',
  upload.single('file'),
  procesarEscolaridadController
);
