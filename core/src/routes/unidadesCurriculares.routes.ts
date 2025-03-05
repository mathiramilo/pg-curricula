import { Router } from 'express';

import {
  obtenerUnidadesCurricularesController,
  obtenerTrayectoriaSugeridaController,
} from '../controllers';

const router = Router();

router.get('/', obtenerUnidadesCurricularesController);
router.get('/trayectoria-sugerida', obtenerTrayectoriaSugeridaController);

export default router;
