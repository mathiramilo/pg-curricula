import compression from 'compression';
import cors from 'cors';
import express, { type Express } from 'express';
import fs from 'fs';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

import { env } from './config';
import { CodigoHTTP } from './constants';
import { errorMiddleware, rateLimiterMiddleware } from './middleware';
import {
  escolaridadRouter,
  previasRouter,
  unidadesCurricularesRouter
} from './routes';

const app: Express = express();

const logDir = path.join(__dirname, 'logs');
// Verifica si la carpeta logs existe, y si no, la crea
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}
const flujoDeRegistro = fs.createWriteStream('logs/accesos.log', {
  flags: 'a'
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
if (env.NODE_ENV === 'production') app.use(rateLimiterMiddleware);

// Logger
app.use(morgan('dev'));
if (env.NODE_ENV === 'production')
  app.use(morgan('combined', { stream: flujoDeRegistro }));

// Rutas
app.use('/api/previas', previasRouter);
app.use('/api/escolaridad', escolaridadRouter);
app.use('/api/ucs', unidadesCurricularesRouter);

// Rutas no encontradas
app.get('*', (req, res) => {
  res.status(CodigoHTTP.NOT_FOUND).json({ error: 'Ruta no encontrada' });
});

// Manejador de errores
app.use(errorMiddleware);

export default app;
