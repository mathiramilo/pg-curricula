import dotenv from 'dotenv';

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PUERTO: process.env.PUERTO || 3000,
  HOST: process.env.HOST || 'localhost',
  CORS_ORIGIN:
    process.env.NODE_ENV === 'production'
      ? process.env.CORS_ORIGIN
      : 'http://localhost:5173',
  RATE_LIMIT_WINDOW_SECS: Number(process.env.COMMON_RATE_LIMIT_WINDOW_SECS),
  RATE_LIMIT_MAX_REQUESTS: Number(process.env.RATE_LIMIT_MAX_REQUESTS),
  PDF_PROCESSOR_SERVICE_URL: process.env.PDF_PROCESSOR_SERVICE_URL,
  API_KEY: process.env.API_KEY,
};
