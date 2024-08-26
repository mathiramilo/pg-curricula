import express, { Express, Request, Response } from 'express';

import { leerPDF, upload } from './controllers/leerPDF.controller';
import { main } from './lib/getPrevsFromCSV';
import prevRoutes from './routes/prevs.routes';

const PORT = process.env.PORT ?? 8080;

const app: Express = express();

app.use(express.json());

app.use('/api/prevs', prevRoutes);

app.post('/upload', upload.single('pdf'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No se subió ningún archivo');
  }

  // Usar filePath donde se guardo el archivo
  const filePath = req.file.path;
  leerPDF(filePath, res);

  // Eliminar el archivo después de procesarlo
  // fs.unlink(filePath, err => {
  //   if (err) {
  //     console.error(`Error al eliminar el archivo temporal: ${err}`);
  //   }
  // });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//main();
