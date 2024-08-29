import express, { Express } from 'express';

import endpointsEscolaridad from './routes/escolaridad.routes';
import endpointsPrevias from './routes/previas.routes';

const PUERTO = process.env.PUERTO ?? 8080;

const app: Express = express();

app.use(express.json());

app.use('/api/previas', endpointsPrevias);
app.use('/api/escolaridad', endpointsEscolaridad);

app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});
