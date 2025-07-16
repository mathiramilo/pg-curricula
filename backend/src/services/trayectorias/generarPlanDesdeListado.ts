import { InformacionEstudiante, SemestreDeDictado, UnidadCurricular } from "@/types";
import { generarGrafo } from "./generarGrafo";
import { validarRequisitosParaTitulo } from "./validarRequisitos";

export const generarPlanDesdeListado = (
  informacionEstudiante: InformacionEstudiante,
  listadoUCs: UnidadCurricular[],
  creditosPorSemestre: number,
  semestreInicial: SemestreDeDictado,
) => {
  // Validar que el listado de UCs cumple los requisitos para el título
  const validacion = validarRequisitosParaTitulo(informacionEstudiante, listadoUCs);
  
  if (!validacion.esValido) {
    throw new Error(`El listado de unidades curriculares no cumple los requisitos para el título: ${validacion.errores.join("; ")}`);
  }

  const grafo = generarGrafo(
    listadoUCs,
    semestreInicial,
    structuredClone(informacionEstudiante),
  );

  const plan = grafo.scheduleFinal(
    semestreInicial,
    creditosPorSemestre,
    structuredClone(informacionEstudiante),
  );

  return plan;
}; 