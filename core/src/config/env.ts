import dotenv from 'dotenv';

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PUERTO: process.env.PUERTO || 3000,
  HOST: process.env.HOST || 'localhost',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  COMMON_RATE_LIMIT_WINDOW_MS:
    Number(process.env.COMMON_RATE_LIMIT_WINDOW_MS) || 1000,
  COMMON_RATE_LIMIT_MAX_REQUESTS:
    Number(process.env.COMMON_RATE_LIMIT_MAX_REQUESTS) || 20,
	PDF_PROCESSOR_SERVICE_URL: process.env.PDF_PROCESSOR_SERVICE_URL || 'http://localhost:8000/api',
};
