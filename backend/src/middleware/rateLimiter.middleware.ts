import type { Request } from 'express';
import { rateLimit } from 'express-rate-limit';

import { env } from '../config';

export const rateLimiterMiddleware = rateLimit({
  legacyHeaders: true,
  limit: env.RATE_LIMIT_MAX_REQUESTS,
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  windowMs: env.RATE_LIMIT_WINDOW_SECS * 1000,
  keyGenerator: (req: Request) => req.ip as string,
});
