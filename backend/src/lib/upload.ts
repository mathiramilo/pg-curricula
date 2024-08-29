import multer from 'multer';
import path from 'path';

// Configuración del almacenamiento de multer
const storage = multer.diskStorage({
  destination(req, archivo, cb) {
    cb(null, 'uploads/'); // Carpeta donde se guardará el archivo
  },
  filename(req, archivo, cb) {
    const sufijoUnico = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${sufijoUnico}${path.extname(archivo.originalname)}`);
  }
});

export const upload = multer({ storage });
