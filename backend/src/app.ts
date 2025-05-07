import compression from 'compression';
import cors from 'cors';
import express, { type Express } from 'express';
import fs from 'fs';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

import { env } from './config';
import { HTTP_STATUS_CODE } from './constants';
import {
  authMiddleware,
  errorMiddleware,
  rateLimiterMiddleware,
} from './middleware';
import {
  escolaridadRouter,
  previasRouter,
  unidadesCurricularesRouter,
} from './routes';

const app: Express = express();

const logDir = path.join(__dirname, '../logs');
const logFile = path.join(logDir, 'accesos.log');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}
if (!fs.existsSync(logFile)) {
  fs.writeFileSync(logFile, '', { flag: 'w' });
}

const logStream = fs.createWriteStream(logFile, {
  flags: 'a',
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());

// Logger
app.use(morgan('dev'));
if (env.NODE_ENV === 'production')
  app.use(morgan('combined', { stream: logStream }));

// Seguridad
app.use(authMiddleware);
if (env.NODE_ENV === 'production') app.use(rateLimiterMiddleware);

// Rutas
app.use('/api/previas', previasRouter);
app.use('/api/escolaridad', escolaridadRouter);
app.use('/api/unidades-curriculares', unidadesCurricularesRouter);

app.get('*', (_req, res) => {
  res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ error: 'Ruta no encontrada' });
});

// Manejador de errores
app.use(errorMiddleware);

export default app;
