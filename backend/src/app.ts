import compression from 'compression';
import cors from 'cors';
import express, { type Express } from 'express';
import fs from 'fs';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './config/env';
import { CodigoHTTP } from './constants/http';
import errorMiddleware from './middleware/error';
import rateLimiter from './middleware/rateLimiter';
import endpointsEscolaridad from './routes/escolaridad.routes';
import endpointsPrevias from './routes/previas.routes';

const app: Express = express();

const flujoDeRegistro = fs.createWriteStream('logs/accesos.log', {
  flags: 'a'
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Logger
app.use(morgan('dev'));
app.use(morgan('combined', { stream: flujoDeRegistro }));

// Rutas
app.use('/api/previas', endpointsPrevias);
app.use('/api/escolaridad', endpointsEscolaridad);

// Rutas no encontradas
app.get('*', (req, res) => {
  res.status(CodigoHTTP.NOT_FOUND).json({ error: 'Ruta no encontrada' });
});

// Manejador de errores
app.use(errorMiddleware);

export default app;
