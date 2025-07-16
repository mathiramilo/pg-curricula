import previaturas from "@/data/previaturas.json";
import trayectoriaSugerida from "@/data/trayectoria-sugerida.json";
import unidadesCurricularesJson from "@/data/unidades-curriculares.json";
import {
  SemestreDeDictado,
  UnidadCurricular,
  type InformacionEstudiante,
} from "@/types";
import { cumplePreviaturas } from "./previaturas.service";

type ObtenerUnidadesCurricularesFilter = Partial<{
  search: string;
  grupo: string;
  minCreditos: string;
  maxCreditos: string;
  semestresDeDictado: string;
  habilitadas: string;
  aprobadas: string;
}>;

export const obtenerUnidadesCurriculares = (
  informacionEstudiante: InformacionEstudiante,
  filter: ObtenerUnidadesCurricularesFilter,
  page: number,
  pageSize: number = 60,
) => {
  let unidadesCurriculares = unidadesCurricularesJson;

  if (filter.search) {
    unidadesCurriculares = unidadesCurriculares.filter(
      (uc) =>
        uc.nombre.toLowerCase().includes(filter.search!.toLowerCase()) ||
        uc.codigo.toLowerCase().includes(filter.search!.toLowerCase()),
    );
  }

  if (filter.grupo) {
    unidadesCurriculares = unidadesCurriculares.filter(
      (uc) => uc.nombreGrupoHijo.toLowerCase() === filter.grupo?.toLowerCase(),
    );
  }

  if (filter.minCreditos) {
    unidadesCurriculares = unidadesCurriculares.filter(
      (uc) => uc.creditos >= +filter.minCreditos!,
    );
  }

  if (filter.maxCreditos) {
    unidadesCurriculares = unidadesCurriculares.filter(
      (uc) => uc.creditos <= +filter.maxCreditos!,
    );
  }

  const semestres = JSON.parse(
    filter.semestresDeDictado || "[]",
  ) as SemestreDeDictado[];

  if (semestres.length) {
    unidadesCurriculares = unidadesCurriculares.filter(
      (uc) =>
        uc.semestres &&
        uc.semestres.some((semestre) =>
          semestres.includes(semestre as SemestreDeDictado),
        ),
    );
  }

  const soloHabilitadas = filter.habilitadas === "true";

  if (soloHabilitadas) {
    unidadesCurriculares = unidadesCurriculares.filter(
      (uc) =>
        uc.semestres &&
        // @ts-expect-error Necessary to access the property dynamically
        cumplePreviaturas(informacionEstudiante, previaturas[uc.codigo]),
    );
  }

  const aprobadas = filter.aprobadas === "true";

  if (aprobadas) {
    unidadesCurriculares = unidadesCurriculares.filter((uc) =>
      Object.keys(informacionEstudiante.unidadesCurricularesAprobadas).includes(
        uc.codigo,
      ),
    );
  }

  const totalItems = unidadesCurriculares.length;
  const startIndex = (page - 1) * pageSize;
  const paginatedData = unidadesCurriculares.slice(
    startIndex,
    startIndex + pageSize,
  );

  return {
    data: paginatedData,
    total: totalItems,
    page,
    pageSize,
  };
};

export const obtenerTrayectoriaSugerida = () => {
  const unidadesCurricularesMap = new Map<string, UnidadCurricular>();
  for (const uc of unidadesCurricularesJson) {
    unidadesCurricularesMap.set(uc.codigo, uc as UnidadCurricular);
  }

  const codigosIncluidos = new Set<string>();

  const trayectoriaProcesada = trayectoriaSugerida.map((semestre) => {
    const unidadesCurricularesProcesadas = semestre.unidadesCurriculares.map(
      ({ codigo }) => {
        codigosIncluidos.add(codigo);
        return unidadesCurricularesMap.get(codigo);
      },
    );

    return {
      ...semestre,
      unidadesCurriculares: unidadesCurricularesProcesadas,
    };
  });

  const unidadesCurricularesNoIncluidas = Array.from(
    unidadesCurricularesMap.values(),
  ).filter((uc) => !codigosIncluidos.has(uc.codigo) && uc.semestres);

  return [
    ...trayectoriaProcesada,
    {
      semestre: null,
      unidadesCurriculares: unidadesCurricularesNoIncluidas,
    },
  ];
};


