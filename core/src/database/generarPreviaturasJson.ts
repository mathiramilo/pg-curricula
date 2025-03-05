import fs from 'fs';

import {
  type Previa,
  type PreviaCSV,
  type ReglaPreviaturas,
  TIPO_INSTANCIA,
  TIPO_PREVIA,
  TIPO_REGLA,
} from '../types';
import { leerCSV } from '../utils/csv';

const UBICACION_CSV_PREVIATURAS = '../../data/csv/previaturas.csv';
const UBICACION_DESTINO = '../../data/previaturas.json';

const generarPreviaturasJson = async (): Promise<void> => {
  try {
    const datos = await leerCSV(UBICACION_CSV_PREVIATURAS);
    const previas = parsearPreviasCSV(datos as PreviaCSV[]);
    const sistemaPreviaturas = generarSistemaPreviaturas(previas);

    fs.writeFileSync(
      UBICACION_DESTINO,
      JSON.stringify(sistemaPreviaturas, null, 2),
      'utf8'
    );
  } catch (error) {
    console.error(error);
  }
};

const parsearPreviasCSV = (rows: PreviaCSV[]): { [key: string]: Previa[] } => {
  const UCs: { [key: string]: Previa[] } = {};

  rows.forEach((fila) => {
    // Ignorar las filas que corresponden a Examenes
    if (fila.tipo_descriptor !== TIPO_INSTANCIA.CURSO) return;

    // Guardar la materia en el objeto
    const nombreUC = fila.nombre_mat;
    if (!UCs[nombreUC]) {
      UCs[nombreUC] = [];
    }

    // Convertir las columnas relevantes a los tipos apropiados
    UCs[nombreUC].push({
      codigoUC: parseInt(fila.cod_materia),
      codigoEnServicioUC: fila.codenservicio_mat,
      nombreUC: fila.nombre_mat,
      codigoCondicion: parseInt(fila.cod_condicion),
      codigoCondicionPadre: fila.cod_condicion_padre
        ? parseInt(fila.cod_condicion_padre)
        : null,
      tipo:
        fila.tipo === 'N' ? TIPO_PREVIA.M : TIPO_PREVIA[fila.tipo] || fila.tipo, // Convertimos las filas de tipo 'N' a 'M' ya que entendemos que son lo mismo
      cantidad: fila.cantmaterias ? parseInt(fila.cantmaterias) : null,
      codigoPlan: fila.cod_plan ? parseInt(fila.cod_plan) : null,
      cantidadCreditos: fila.cantcreditos ? parseInt(fila.cantcreditos) : null,
      codigoGrupo: fila.cod_grupo ? parseInt(fila.cod_grupo) : null,
      nombreGrupo: fila.nombre_grupo || null,
      codigoElemento: fila.cod_elemento ? parseInt(fila.cod_elemento) : null,
      tipoInstancia:
        fila.tipo_instancia === 'C'
          ? TIPO_INSTANCIA.CURSO
          : fila.tipo_instancia === 'E'
            ? TIPO_INSTANCIA.EXAMEN
            : null,
      nombrePrevia: fila['nombre_mat-2'] || null,
      codigoEnServicioPrevia: fila['codenservicio_mat-2'] || null,
    });
  });

  return UCs;
};

const agruparPorCampo = (
  previas: Previa[],
  field: keyof Previa
): {
  [key: string]: Previa[];
} => {
  return previas.reduce(
    (previasAgrupadas, uc) => {
      const clave = String(uc[field]);
      if (!previasAgrupadas[clave]) {
        previasAgrupadas[clave] = [];
      }
      previasAgrupadas[clave].push(uc);
      return previasAgrupadas;
    },
    {} as { [clave: string]: Previa[] }
  );
};

const generarSistemaPreviaturas = (previasAgrupadas: {
  [nombreUC: string]: Previa[];
}): { [nombreUC: string]: ReglaPreviaturas } => {
  const sistemaPreviaturas = {};
  Object.entries(previasAgrupadas).forEach(
    ([nombreUC, previasUC]) =>
      (sistemaPreviaturas[nombreUC] = generarReglaRaiz(previasUC))
  );

  return sistemaPreviaturas;
};

const generarReglaRaiz = (previas: Previa[]): ReglaPreviaturas => {
  const filaRaiz = previas.find((p) => !p.codigoCondicionPadre);
  if (!filaRaiz) throw new Error('No se encontro el nodo raiz');

  // Agrupar filas de tipo B por cod_condicion y dejar solo una fila en previas
  const filasDeTipoB = previas.filter((p) => p.tipo === TIPO_PREVIA.B);
  const filasAgrupadasPorCodCondicion = agruparPorCampo(
    filasDeTipoB,
    'codigoCondicion'
  );
  const filasAgrupadasPorCodCondicionKeys = Object.keys(
    filasAgrupadasPorCodCondicion
  );

  const previasFormateadas = previas.filter((p) => p.tipo !== TIPO_PREVIA.B);
  filasAgrupadasPorCodCondicionKeys.forEach((codCondicion) => {
    const previas = filasAgrupadasPorCodCondicion[codCondicion];
    if (previas && previas.length > 0) {
      const previa = previas[0];
      previa && previasFormateadas.push(previa);
    }
  });

  return generarRegla(
    filaRaiz,
    filasAgrupadasPorCodCondicion,
    previasFormateadas
  );
};

const generarRegla = (
  row: Previa,
  previasDeTipoB: { [codigoCondicion: string]: Previa[] },
  previasFormateadas: Previa[]
): ReglaPreviaturas => {
  const {
    cantidadCreditos,
    cantidad,
    codigoCondicion,
    codigoEnServicioPrevia,
    nombrePrevia,
    codigoGrupo,
    nombreGrupo,
    tipoInstancia,
    tipo,
  } = row;

  switch (tipo) {
    case TIPO_PREVIA.AND: {
      const ANDfilteredPrevs = previasFormateadas.filter(
        (p) => p.codigoCondicionPadre === codigoCondicion
      );
      return {
        regla: TIPO_REGLA.AND,
        previas: ANDfilteredPrevs.map((prev) =>
          generarRegla(prev, previasDeTipoB, previasFormateadas)
        ),
      };
    }
    case TIPO_PREVIA.OR: {
      const ORfilteredPrevs = previasFormateadas.filter(
        (p) => p.codigoCondicionPadre === codigoCondicion
      );
      return {
        regla: TIPO_REGLA.OR,
        previas: ORfilteredPrevs.map((prev) =>
          generarRegla(prev, previasDeTipoB, previasFormateadas)
        ),
      };
    }
    case TIPO_PREVIA.NOT: {
      const NOTPrev = previasFormateadas.find(
        (p) => p.codigoCondicionPadre === codigoCondicion
      );
      if (!NOTPrev) return;
      return {
        regla: TIPO_REGLA.NOT,
        previas: generarRegla(NOTPrev, previasDeTipoB, previasFormateadas),
      };
    }
    case TIPO_PREVIA.B: {
      const BPrevs = previasDeTipoB[codigoCondicion]
        ? previasDeTipoB[codigoCondicion].map((p) => ({
            ...p,
            tipo: TIPO_PREVIA.M,
          }))
        : [];
      return {
        regla: TIPO_REGLA.SOME,
        cantidad,
        previas: BPrevs.map((prev) =>
          generarRegla(prev, previasDeTipoB, previasFormateadas)
        ),
      };
    }
    case TIPO_PREVIA.M || TIPO_PREVIA.N: {
      return {
        regla: TIPO_REGLA.UC,
        codigo: codigoEnServicioPrevia,
        nombre: nombrePrevia,
        tipoInstancia,
      };
    }
    case TIPO_PREVIA.D: {
      return {
        regla: TIPO_REGLA.CREDITOS_GRUPO,
        codigo: codigoGrupo,
        nombre: nombreGrupo,
        cantidad: cantidadCreditos,
      };
    }
    case TIPO_PREVIA.R: {
      return {
        regla: TIPO_REGLA.CREDITOS_PLAN,
        cantidad: cantidadCreditos,
      };
    }
    default: {
      // TODO: Ver que hacer con las filas de tipo C, I y K
      console.log('Tipo de regla desconocido:', tipo);
    }
  }
};

generarPreviaturasJson();
