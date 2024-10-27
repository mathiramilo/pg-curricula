import dotenv from 'dotenv';

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PUERTO: process.env.PUERTO || 8080,
  HOST: process.env.HOST || 'localhost',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  COMMON_RATE_LIMIT_WINDOW_MS:
    Number(process.env.COMMON_RATE_LIMIT_WINDOW_MS) || 1000,
  COMMON_RATE_LIMIT_MAX_REQUESTS:
    Number(process.env.COMMON_RATE_LIMIT_MAX_REQUESTS) || 20
};
