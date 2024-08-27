import { exec } from 'child_process';
import { Response } from 'express';
import multer from 'multer';
import path from 'path';

// Configuración del almacenamiento de multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se guardará el archivo
  },
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

export const upload = multer({ storage });

export const leerPDF = (
  filePath: string,
  res: Response,
  callback: () => void
): void => {
  exec(
    `python src/scripts/pdf-reader.py ${filePath} --wir`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).send('Error en la ejecución del script');
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return res.status(500).send('Error en la ejecución del script');
      }

      console.log('Output del script:', stdout);

      // Si todo fue bien, solo devolver éxito
      res.status(200).send(JSON.parse(stdout));

      // Llama al callback para eliminar el archivo
      callback();
    }
  );
};
