import { Router } from 'express';

import {
  getUnidadesCurricularesController,
  getUnidadesCurricularesOpcionalesController,
  getUnidadesCurricularesSemestresController,
} from '../controllers';

const router = Router();

router.get('/', getUnidadesCurricularesController);
router.get('/semestres', getUnidadesCurricularesSemestresController);
router.get('/opcionales', getUnidadesCurricularesOpcionalesController);

export default router;
