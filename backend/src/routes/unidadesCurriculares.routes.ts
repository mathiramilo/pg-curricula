import { Router } from 'express';

import {
  unidadesCurriculares,
  unidadesCurricularesSemestres
} from '../controllers';

const router = Router();

router.get('/semetres', unidadesCurricularesSemestres);
router.get('/', unidadesCurriculares);

export default router;
