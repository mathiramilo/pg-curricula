export class ExtendedError extends Error {
    public details: string;
  
    constructor(message: string, details: string) {
      super(message); // Llamar al constructor de la clase base Error
      this.name = this.constructor.name; // Configurar el nombre del error personalizado
      this.details = details; // Información adicional
  
      // Mantener el stack trace correcto cuando se extiende Error
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }