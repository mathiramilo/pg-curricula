export const obtenerComandoScriptPython = (ubicacionArchivo: string): string =>
  `python3 src/scripts/pdf-reader.py ${ubicacionArchivo}`;

export const eliminarTildes = (text: string): string => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');