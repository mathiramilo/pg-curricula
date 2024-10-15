export const obtenerComandoScriptPython = (ubicacionArchivo: string): string =>
  `python src/scripts/pdf-reader.py ${ubicacionArchivo}`;
