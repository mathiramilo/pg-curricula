import { Router } from 'express';

import { generarPlanController } from '../controllers';

export const planesRouter = Router();

planesRouter.post('/', generarPlanController);
