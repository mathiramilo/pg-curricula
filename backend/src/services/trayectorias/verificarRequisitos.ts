import requisitosTitulo from "@/data/requisitos-titulo.json";
import { InformacionEstudiante, UnidadCurricular } from "@/types";
import { actualizarInformacionEstudiante } from "@/utils";

interface VerificarRequisitosError {
  type: string;
  message: string;
}

export const verificarRequisitosParaTitulo = (
  informacionEstudiante: InformacionEstudiante,
  listadoUCs: UnidadCurricular[],
) => {
  const errors: VerificarRequisitosError[] = [];
  const informacionEstudianteSimulado = structuredClone(informacionEstudiante);

  listadoUCs.forEach((uc) => {
    actualizarInformacionEstudiante(
      informacionEstudianteSimulado,
      uc,
      uc.nombreGrupoHijo,
    );
  });

  if (
    informacionEstudianteSimulado.creditosTotales <
    requisitosTitulo["Creditos Totales"]
  ) {
    const creditosTotalesFaltantes =
      requisitosTitulo["Creditos Totales"] -
      informacionEstudianteSimulado.creditosTotales;
    errors.push({
      type: "Creditos Totales",
      message: `${creditosTotalesFaltantes} créditos Totales`,
    });
  }

  for (const [grupo, creditosRequeridos] of Object.entries(requisitosTitulo)) {
    if (grupo === "Creditos Totales") continue;

    // @ts-expect-error Necessary to access the property dynamically
    const creditosActuales = informacionEstudianteSimulado[grupo];
    if (creditosActuales < creditosRequeridos) {
      errors.push({
        type: grupo,
        message: `${creditosRequeridos - creditosActuales} créditos del grupo ${grupo}`,
      });
    }
  }

  const satisfaceRequisitos = errors.length === 0;

  return {
    success: satisfaceRequisitos,
    errors,
  };
};
