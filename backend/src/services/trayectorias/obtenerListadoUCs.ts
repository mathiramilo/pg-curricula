import previaturas from "@/data/previaturas.json";
import requisitosTitulo from "@/data/requisitos-titulo.json";
import ucsObligatorias from "@/data/ucs-obligatorias.json";
import ucsOptativasGruposActuales from "@/data/ucs-optativas-grupos-actuales.json";
import unidadesCurricularesJson from "@/data/unidades-curriculares.json";
import ucsPrimerSemestre from "@/data/ucs-primer-semestre.json";
import ucsSegundoSemestre from "@/data/ucs-segundo-semestre.json";
import {
  GrupoHijo,
  InformacionEstudiante,
  ReglaPreviaturas,
  UnidadCurricular,
} from "@/types";
import { actualizarInformacionEstudiante } from "@/utils";
import { cumplePreviaturas } from "../previaturas.service";

const UCS_EXCEPCIONALES = [
  { nombre: "PROYECTO DE GRADO", codigo: "1730" },
] as const;
const PROGRAMACION_FUNCIONAL_OR_LOGICA = [
  { nombre: "PROGRAMACION FUNCIONAL", codigo: "1354" },
  { nombre: "PROGRAMACION LOGICA", codigo: "1340" },
] as const;

const previaturasTyped = previaturas as Record<string, ReglaPreviaturas>;
const ucsOptativasGruposActualesTyped = ucsOptativasGruposActuales as Record<
  string,
  string[]
>;

const MAX_ITERATIONS = 1000;

const codigosPrimerSemestre = new Set(ucsPrimerSemestre.map((uc) => uc.codigo));
const codigosSegundoSemestre = new Set(ucsSegundoSemestre.map((uc) => uc.codigo));

export const obtenerListadoUCs = (
  informacionEstudiante: InformacionEstudiante,
): UnidadCurricular[] => {
  let iterations = 0;
  const listadoUCs: UnidadCurricular[] = [];

  // 1. Eliminar de materias obligatorias las ya aprobadas
  const ucsObligatoriasFiltradas = ucsObligatorias.filter(
    (unidadCurricular) =>
      !Object.hasOwn(
        informacionEstudiante.unidadesCurricularesAprobadas,
        unidadCurricular.codigo,
      ),
  );

  const ucsObligatoriasFaltantes = ucsObligatoriasFiltradas
    .map((unidadCurricular) => {
      return unidadesCurricularesJson.find(
        (uc) => uc.codigo === unidadCurricular.codigo,
      ) as UnidadCurricular;
    })
    .filter((uc) => uc);

  // 2. Agregar las materias obligatorias al listado y actualizar informacionEstudiante
  // Para que esto funcione el listado de materias obligatorias debe estar ordenado, empezando por las que tienen menos previas, para que la funcion "cumplePrevias" retorne true.
  ucsObligatoriasFaltantes.forEach((unidadCurricular) => {
    if (
      cumplePreviaturas(
        informacionEstudiante,
        previaturasTyped[unidadCurricular.codigo],
      ) ||
      UCS_EXCEPCIONALES.find((uc) => uc.codigo === unidadCurricular.codigo)
    ) {
      listadoUCs.push(unidadCurricular);

      actualizarInformacionEstudiante(
        informacionEstudiante,
        unidadCurricular,
        unidadCurricular.nombreGrupoHijo,
      );
    }
  });

  // 3. Agregamos Programación Funcional o Lógica ya que es obligatorio tener una de las dos
  const randomIndex = Math.floor(
    Math.random() * PROGRAMACION_FUNCIONAL_OR_LOGICA.length,
  );
  const progFuncionalOrLogica = unidadesCurricularesJson.find(
    (uc) => uc.codigo === PROGRAMACION_FUNCIONAL_OR_LOGICA[randomIndex]?.codigo,
  ) as UnidadCurricular;

  listadoUCs.push(progFuncionalOrLogica);
  actualizarInformacionEstudiante(
    informacionEstudiante,
    progFuncionalOrLogica,
    progFuncionalOrLogica.nombreGrupoHijo,
  );

  // Por cada grupo
  for (const grupo in ucsOptativasGruposActualesTyped) {
    // Si cumple los requisitos pasar al siguiente
    // @ts-expect-error Necessary to access the property dynamically
    if (informacionEstudiante[grupo] >= requisitosTitulo[grupo]) continue;

    // 1. Eliminar de materias grupo las ya aprobadas
    // @ts-expect-error Necessary to access the property dynamically
    const codigoUCsGrupoFiltradas = ucsOptativasGruposActualesTyped[
      grupo
    ].filter(
      (codigoUC) =>
        !Object.hasOwn(
          informacionEstudiante.unidadesCurricularesAprobadas,
          codigoUC,
        ),
    );

    // 2. Seleccionar una materia al azar, agregarla al listado y actualizar informacionEstudiante
    iterations = 0;
    // @ts-expect-error Necessary to access the property dynamically
    while (informacionEstudiante[grupo] < requisitosTitulo[grupo]) {
      if (iterations >= MAX_ITERATIONS) {
        console.warn(
          `Max iterations reached for group ${grupo}. Skipping to next group.`,
        );
        break;
      }
      iterations++;

      const indiceAleatorio = Math.floor(
        Math.random() * codigoUCsGrupoFiltradas.length,
      );
      const codigoUCAleatorio = codigoUCsGrupoFiltradas?.[indiceAleatorio];
      const ucAleatoria = unidadesCurricularesJson.find(
        (uc) => uc.codigo === codigoUCAleatorio,
      ) as UnidadCurricular;
      const previaturasUCAleatoria = previaturasTyped[
        ucAleatoria.codigo
      ] as ReglaPreviaturas;

      if (
        !cumplePreviaturas(informacionEstudiante, previaturasUCAleatoria) ||
        listadoUCs.find((uc) => uc.codigo === ucAleatoria.codigo)
      )
        continue;

      listadoUCs.push(ucAleatoria);
      actualizarInformacionEstudiante(
        informacionEstudiante,
        ucAleatoria,
        grupo as GrupoHijo,
      );
    }
  }

  const grupos = Object.keys(ucsOptativasGruposActuales);
  const countPorGrupoYSemestre: Record<string, { primer: number; segundo: number }> = {};
  grupos.forEach(grupo => {
    countPorGrupoYSemestre[grupo] = { primer: 0, segundo: 0 };
  });

  // Hasta completar 450 creditos
  iterations = 0;
  while (informacionEstudiante.creditosTotales < 450) {
    if (iterations >= MAX_ITERATIONS) {
      console.warn(
        "Max iterations reached while trying to complete 450 credits. Stopping.",
      );
      break;
    }
    iterations++;
    // 1. Seleccionar un grupo al azar
    const grupoAleatorio = grupos[
      Math.floor(Math.random() * grupos.length)
    ] as GrupoHijo;

    // 2. Filtrar materias disponibles del grupo por semestre
    const codigosDisponibles = ucsOptativasGruposActualesTyped[
      grupoAleatorio
    ]?.filter(
      (codigoUC) =>
        !Object.hasOwn(
          informacionEstudiante.unidadesCurricularesAprobadas,
          codigoUC,
        ) && !listadoUCs.find((uc) => uc.codigo === codigoUC),
    );

    const codigosPrimer = codigosDisponibles?.filter((codigo) =>
      codigosPrimerSemestre.has(codigo),
    );
    const codigosSegundo = codigosDisponibles?.filter((codigo) =>
      codigosSegundoSemestre.has(codigo),
    );

    // 3. Elegir semestre con menos materias seleccionadas en este grupo
    let listaElegida: string[];
    if (countPorGrupoYSemestre[grupoAleatorio]!.primer <= countPorGrupoYSemestre[grupoAleatorio]!.segundo) {
      listaElegida = codigosPrimer!.length > 0 ? codigosPrimer! : codigosSegundo!;
    } else {
      listaElegida = codigosSegundo!.length > 0 ? codigosSegundo! : codigosPrimer!;
    }
    if (listaElegida.length === 0) continue; // No hay más materias disponibles en este grupo

    // 4. Seleccionar una materia al azar de la lista elegida
    const indiceAleatorio = Math.floor(Math.random() * listaElegida.length);
    const codigoUCAleatorio = listaElegida[indiceAleatorio];
    const ucAleatoria = unidadesCurricularesJson.find(
      (uc) => uc.codigo === codigoUCAleatorio,
    ) as UnidadCurricular;
    const previaturasUCAleatoria = previaturasTyped[ucAleatoria.codigo] as ReglaPreviaturas;

    if (!cumplePreviaturas(informacionEstudiante, previaturasUCAleatoria)) continue;

    // 5. Agregar la unidad curricular al listado y actualizar informacionEstudiante
    listadoUCs.push(ucAleatoria);
    actualizarInformacionEstudiante(
      informacionEstudiante,
      ucAleatoria,
      grupoAleatorio!,
    );

    // 6. Actualizar el contador de semestre para este grupo
    if (codigosPrimerSemestre.has(codigoUCAleatorio!)) {
      countPorGrupoYSemestre[grupoAleatorio]!.primer++;
    } else if (codigosSegundoSemestre.has(codigoUCAleatorio!)) {
      countPorGrupoYSemestre[grupoAleatorio]!.segundo++;
    }
  }

  return listadoUCs;
};
