import { Router } from 'express';

import {
  unidadesCurriculares,
  unidadesCurricularesOpcionales,
  unidadesCurricularesSemestres
} from '../controllers';

const router = Router();

router.get('/semestres', unidadesCurricularesSemestres);
router.get('/opcionales', unidadesCurricularesOpcionales);
router.get('/', unidadesCurriculares);

export default router;
