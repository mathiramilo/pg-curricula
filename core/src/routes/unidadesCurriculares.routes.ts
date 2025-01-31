import { Router } from 'express';

import {
  unidadesCurricularesController,
  unidadesCurricularesOpcionalesController,
  unidadesCurricularesSemestresController
} from '../controllers';

const router = Router();

router.get('/semestres', unidadesCurricularesSemestresController);
router.get('/opcionales', unidadesCurricularesOpcionalesController);
router.get('/', unidadesCurricularesController);

export default router;
