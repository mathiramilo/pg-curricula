export const obtenerComandoScriptPython = (
  ubicacionArchivo: string,
  conResultadosIntermedios: boolean
): string =>
  `python src/scripts/pdf-reader.py ${ubicacionArchivo} ${conResultadosIntermedios ? '--cri' : ''}`;
