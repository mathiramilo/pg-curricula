import express, { Express } from 'express';

import prevRoutes from './routes/prevs.routes';

const PORT = process.env.PORT || 8080;

const app: Express = express();

app.use(express.json());

app.use('/api/prevs', prevRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
