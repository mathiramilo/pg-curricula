import requisitosTitulo from "@/data/requisitos-titulo.json";
import ucsObligatorias from "@/data/ucs-obligatorias.json";
import { InformacionEstudiante, UnidadCurricular } from "@/types";
import { actualizarInformacionEstudiante } from "@/utils";

export const validarRequisitosParaTitulo = (
  informacionEstudiante: InformacionEstudiante,
  listadoUCs: UnidadCurricular[],
): { esValido: boolean; errores: string[] } => {
  const errores: string[] = [];
  
  // Crear una copia de la información del estudiante para simular completar todas las UCs
  const informacionEstudianteSimulado = structuredClone(informacionEstudiante);
  
  // Simular aprobar todas las UCs del listado
  listadoUCs.forEach((uc) => {
    actualizarInformacionEstudiante(
      informacionEstudianteSimulado,
      uc,
      uc.nombreGrupoHijo,
    );
  });

  // Verificar UCs obligatorias
  const ucsObligatoriasFaltantes = ucsObligatorias.filter(
    (ucObligatoria) =>
      !Object.hasOwn(
        informacionEstudianteSimulado.unidadesCurricularesAprobadas,
        ucObligatoria.codigo,
      ),
  );

  if (ucsObligatoriasFaltantes.length > 0) {
    errores.push(
      `Faltan las siguientes unidades curriculares obligatorias: ${ucsObligatoriasFaltantes
        .map((uc) => `${uc.nombre} (${uc.codigo})`)
        .join(", ")}`,
    );
  }

  // Verificar créditos mínimos totales (450 créditos)
  if (informacionEstudianteSimulado.creditosTotales < 450) {
    errores.push(
      `Se requieren 450 créditos para el título, solo se tienen ${informacionEstudianteSimulado.creditosTotales}`,
    );
  }

  // Verificar requisitos por grupo
  for (const [grupo, creditosRequeridos] of Object.entries(requisitosTitulo)) {
    // @ts-expect-error Necessary to access the property dynamically
    const creditosActuales = informacionEstudianteSimulado[grupo];
    if (creditosActuales < creditosRequeridos) {
      errores.push(
        `Grupo "${grupo}": se requieren ${creditosRequeridos} créditos, solo se tienen ${creditosActuales}`,
      );
    }
  }

  return {
    esValido: errores.length === 0,
    errores,
  };
}; 