enum TipoDescriptor {
  'E',
  'C'
}

// Nodo para el árbol de materias
class Nodo {
  codigo: string;
  tipo: string | undefined;
  cantMaterias: string | undefined;
  previas: Nodo[];
  previaDe: Nodo[];

  constructor(codigo, tipo = undefined, cant_materias = undefined) {
    this.codigo = codigo; // Código de la materia - codenservicio_mat
    this.tipo = tipo; // Tipo de previatura (B, R, AND, NOT, OR, M, D)
    this.cantMaterias = cant_materias; // Cantidad de materias aprobadas en caso de tipo sea B
    this.previas = []; // Lista de nodos previos (hijos)
    this.previaDe = []; // Lista de nodos que tienen a este nodo como previa (padre)
  }

  // Agregar una previa (nodo hijo)
  agregarPrevia = (nodo: Nodo) => {
    this.previas.push(nodo);
  };

  // Agregar un nodo que tiene a este nodo como previa (nodo padre)
  agregarPreviaDe = (nodo: Nodo) => {
    this.previaDe.push(nodo);
  };
}

// Función para construir el árbol de previas segun si es para poder cursar o dar el examen
const construirArbolPrevias = materias => {
  const hash = {};

  // Crear nodos para todas las materias
  materias.forEach(materia => {
    const { codenservicio_mat, cod_condicion_padre, tipo } = materia;

    // Si la materia aún no existe en el hash, la creamos
    if (!hash[codenservicio_mat]) {
      hash[codenservicio_mat] = new Nodo(codenservicio_mat);
    }

    // Si la materia tiene una previa (padre), lo agregamos
    // if (cod_condicion_padre) {
    //   if (!hash[cod_condicion_padre]) {
    //     hash[cod_condicion_padre] = new Nodo(cod_condicion_padre);
    //   }

    //   hash[cod_condicion_padre].agregarPrevia(hash[cod_materia]);
    // }

    // Asignar el tipo de relación (AND, OR, NOT, etc.)
    hash[codenservicio_mat].tipo = tipo;
  });

  return hash;
};

// Función para visualizar el árbol de previas
const imprimirArbol = (nodo, nivel = 0) => {
  console.log(
    ' '.repeat(nivel * 2) + nodo.codigo + (nodo.tipo ? ` (${nodo.tipo})` : '')
  );

  nodo.previas.forEach(hijo => {
    imprimirArbol(hijo, nivel + 1);
  });
};
