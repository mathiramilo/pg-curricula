import { Router } from 'express';

import {
  unidadesCurriculares,
  unidadesCurricularesSemestres
} from '../controllers';

const router = Router();

router.get('/semestres', unidadesCurricularesSemestres);
router.get('/', unidadesCurriculares);

export default router;
