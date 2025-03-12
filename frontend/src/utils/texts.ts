export const capitalizeWords = (text: string): string => {
  // Insertar espacio después de cada punto o coma que no lo tenga.
  const result = text.replace(/([.,:])(?=\S)/g, "$1 ");

  // Dividir el texto en palabras usando el espacio como separador.
  const words = result.split(" ");

  // Palabras que no se deben capitalizar (salvo si son la primera palabra)
  const exceptions = new Set([
    "de",
    "a",
    "por",
    "en",
    "y",
    "e",
    "del",
    "la",
    "los",
    "las",
    "al",
    "para",
    "no",
  ]);

  // Palabras (romanos) que se deben mantener en mayúsculas.
  const romanNumerals = new Set(["I", "II", "III", "IV", "V"]);

  const processedWords = words.map((word, index) => {
    if (!word) return word;

    // Separar posibles prefijos y sufijos de puntuación.
    const match = /^([^a-zA-Z0-9]*)([a-zA-Z0-9]+)([^a-zA-Z0-9]*)$/.exec(word);
    if (match) {
      const [, prefix, core, suffix] = match;

      // Si la palabra (sin puntuación) corresponde a un numeral romano, se deja en mayúsculas.
      if (romanNumerals.has(core.toUpperCase())) {
        return prefix + core.toUpperCase() + suffix;
      } else {
        // Procesar la palabra convirtiéndola a minúsculas.
        let processedCore = core.toLowerCase();
        // Si es la primera palabra o no está en la lista de excepciones, capitalizar la primera letra.
        if (index === 0 || !exceptions.has(processedCore)) {
          processedCore =
            processedCore.charAt(0).toUpperCase() + processedCore.slice(1);
        }
        return prefix + processedCore + suffix;
      }
    } else {
      // En caso de no poder separar la palabra, se procesa de forma general.
      let lowered = word.toLowerCase();
      if (index === 0 || !exceptions.has(lowered)) {
        lowered = lowered.charAt(0).toUpperCase() + lowered.slice(1);
      }
      return lowered;
    }
  });

  return processedWords.join(" ");
};

export const getSemestreTitle = (semestre: number | null) => {
  switch (semestre) {
    case 1:
      return "Primer Semestre";
    case 2:
      return "Segundo Semestre";
    case 3:
      return "Tercer Semestre";
    case 4:
      return "Cuarto Semestre";
    case 5:
      return "Quinto Semestre";
    case 6:
      return "Sexto Semestre";
    case 7:
      return "Séptimo Semestre";
    case 8:
      return "Octavo Semestre";
    case 9:
      return "Noveno Semestre";
    case 10:
      return "Décimo Semestre";
    default:
      return "Materias Opcionales";
  }
};

export const getSemestresDeDictado = (semestres: number[] | null) => {
  if (!semestres?.length) {
    return "No se dicta actualmente";
  }

  return semestres.join(" y ");
};
