import fs from 'fs';

import {
  type Previa,
  type PreviaCSV,
  type ReglaPreviaturas,
  TipoInstancia,
  TipoPrevia,
  TipoRegla
} from '../types';
import { leerCSV } from '../lib/leerCSV';

const UBICACION_CSV_PREVIATURAS = '../../data/previaturas.csv';
const UBICACION_DESTINO = '../../data/previaturas.json';

const generarPreviaturas = async (): Promise<void> => {
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

const parsearPreviasCSV = (
  filas: PreviaCSV[]
): { [clave: string]: Previa[] } => {
  const UCs: { [clave: string]: Previa[] } = {};

  filas.forEach(fila => {
    // Ignorar las filas que corresponden a Examenes
    if (fila.tipo_descriptor !== TipoInstancia.C) return;

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
        fila.tipo === 'N' ? TipoPrevia.M : TipoPrevia[fila.tipo] || fila.tipo, // Convertimos las filas de tipo 'N' a 'M' ya que entendemos que son lo mismo
      cantidad: fila.cantmaterias ? parseInt(fila.cantmaterias) : null,
      codigoPlan: fila.cod_plan ? parseInt(fila.cod_plan) : null,
      cantidadCreditos: fila.cantcreditos ? parseInt(fila.cantcreditos) : null,
      codigoGrupo: fila.cod_grupo ? parseInt(fila.cod_grupo) : null,
      nombreGrupo: fila.nombre_grupo || null,
      codigoElemento: fila.cod_elemento ? parseInt(fila.cod_elemento) : null,
      tipoInstancia: TipoInstancia[fila.tipo_instancia] || null,
      nombrePrevia: fila['nombre_mat-2'] || null,
      codigoEnServicioPrevia: fila['codenservicio_mat-2'] || null
    });
  });

  return UCs;
};

const agruparPorCampo = (
  UCs: Previa[],
  campo: keyof Previa
): {
  [clave: string]: Previa[];
} => {
  return UCs.reduce(
    (UCsAgrupadas, uc) => {
      const clave = String(uc[campo]);
      if (!UCsAgrupadas[clave]) {
        UCsAgrupadas[clave] = [];
      }
      UCsAgrupadas[clave].push(uc);
      return UCsAgrupadas;
    },
    {} as { [clave: string]: Previa[] }
  );
};

const generarSistemaPreviaturas = (UCsAgrupadas: {
  [nombreUC: string]: Previa[];
}): { [nombreUC: string]: ReglaPreviaturas } => {
  const sistemaPreviaturas = {};
  Object.entries(UCsAgrupadas).forEach(
    ([nombreUC, previasUC]) =>
      (sistemaPreviaturas[nombreUC] = generarReglaRaiz(previasUC))
  );

  return sistemaPreviaturas;
};

const generarReglaRaiz = (previas: Previa[]): ReglaPreviaturas => {
  const filaRaiz = previas.find(p => !p.codigoCondicionPadre);
  if (!filaRaiz) throw new Error('No se encontro el nodo raiz');

  // Agrupar filas de tipo B por cod_condicion y dejar solo una fila en previas
  const filasDeTipoB = previas.filter(p => p.tipo === TipoPrevia.B);
  const filasAgrupadasPorCodCondicion = agruparPorCampo(
    filasDeTipoB,
    'codigoCondicion'
  );
  const filasAgrupadasPorCodCondicionKeys = Object.keys(
    filasAgrupadasPorCodCondicion
  );

  const previasFormateadas = previas.filter(p => p.tipo !== TipoPrevia.B);
  filasAgrupadasPorCodCondicionKeys.forEach(codCondicion => {
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
  fila: Previa,
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
    tipo
  } = fila;

  switch (tipo) {
    case TipoPrevia.AND: {
      const ANDfilteredPrevs = previasFormateadas.filter(
        p => p.codigoCondicionPadre === codigoCondicion
      );
      return {
        regla: TipoRegla.AND,
        previas: ANDfilteredPrevs.map(prev =>
          generarRegla(prev, previasDeTipoB, previasFormateadas)
        )
      };
    }
    case TipoPrevia.OR: {
      const ORfilteredPrevs = previasFormateadas.filter(
        p => p.codigoCondicionPadre === codigoCondicion
      );
      return {
        regla: TipoRegla.OR,
        previas: ORfilteredPrevs.map(prev =>
          generarRegla(prev, previasDeTipoB, previasFormateadas)
        )
      };
    }
    case TipoPrevia.NOT: {
      const NOTPrev = previasFormateadas.find(
        p => p.codigoCondicionPadre === codigoCondicion
      );
      if (!NOTPrev) return;
      return {
        regla: TipoRegla.NOT,
        previas: generarRegla(NOTPrev, previasDeTipoB, previasFormateadas)
      };
    }
    case TipoPrevia.B: {
      const BPrevs = previasDeTipoB[codigoCondicion]
        ? previasDeTipoB[codigoCondicion].map(p => ({
            ...p,
            tipo: TipoPrevia.M
          }))
        : [];
      return {
        regla: TipoRegla.SOME,
        cantidad,
        previas: BPrevs.map(prev =>
          generarRegla(prev, previasDeTipoB, previasFormateadas)
        )
      };
    }
    case TipoPrevia.M || TipoPrevia.N: {
      return {
        regla: TipoRegla.UC,
        codigo: codigoEnServicioPrevia,
        nombre: nombrePrevia,
        tipoInstancia
      };
    }
    case TipoPrevia.D: {
      return {
        regla: TipoRegla.CREDITOS_GRUPO,
        codigo: codigoGrupo,
        nombre: nombreGrupo,
        cantidad: cantidadCreditos
      };
    }
    case TipoPrevia.R: {
      return {
        regla: TipoRegla.CREDITOS_PLAN,
        cantidad: cantidadCreditos
      };
    }
    default: {
      // TODO: Ver que hacer con las filas de tipo N, C, I y K
      console.log('Tipo de regla desconocido:', tipo);
    }
  }
};

generarPreviaturas();