export const obtenerComandoScriptPython = (ubicacionArchivo: string): string =>
  `python src/scripts/pdf-reader.py ${ubicacionArchivo}`;

export const eliminarTildes = (text: string): string => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');