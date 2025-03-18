import ucsFing from '../../data/ucs-fing.json';

// Posibles valores para las aristas: 0, 1 o 2.
export type EdgeValue = 0 | 1 | 2;

/**
 * Representa una arista entre dos nodos.
 * - `source`: identificador del nodo origen.
 * - `target`: identificador del nodo destino.
 * - `value`: el "peso" o valor de la arista (0, 1, o 2).
 */
export interface Edge {
  source: string;
  target: string;
  value: EdgeValue;
}

/**
 * Representa un nodo (unidad curricular u otro nodo especial).
 * - `id`: nombre/código único del nodo.
 * - `outgoingEdges`: lista de aristas salientes.
 * - `incomingEdges`: lista de aristas entrantes.
 * - `isInitial`: indica si es el nodo inicial.
 * - `isFinal`: indica si es el nodo final.
 */
export interface Node {
  id: string;
  outgoingEdges: Edge[];
  incomingEdges: Edge[];
  isInitial: boolean;
  isFinal: boolean;
}

export class Graph {
  // Mapa de todos los nodos, indexados por su id
  private nodes: Map<string, Node>;

  constructor() {
    this.nodes = new Map<string, Node>();
  }

  /**
   * Crea y registra un nuevo nodo en el grafo.
   * @param id Identificador único del nodo
   * @param isInitial Indica si es el nodo inicial
   * @param isFinal Indica si es el nodo final
   */
  public addNode(id: string, isInitial = false, isFinal = false): void {
    if (this.nodes.has(id)) {
      throw new Error(`Ya existe un nodo con id '${id}'.`);
    }

    const newNode: Node = {
      id,
      outgoingEdges: [],
      incomingEdges: [],
      isInitial,
      isFinal,
    };

    this.nodes.set(id, newNode);
  }

  /**
   * Crea una arista dirigida desde un nodo fuente a uno destino con un valor dado.
   * Actualiza tanto las aristas salientes del nodo origen como las entrantes del nodo destino.
   * @param from Id del nodo origen
   * @param to Id del nodo destino
   * @param value Valor de la arista (0, 1 o 2)
   */
  public addEdge(from: string, to: string, value: EdgeValue): void {
    const fromNode = this.nodes.get(from);
    const toNode = this.nodes.get(to);

    if (!fromNode || !toNode) {
      throw new Error(
        `No se puede crear la arista. Uno de los nodos (${from}, ${to}) no existe.`
      );
    }

    // Validaciones de ejemplo (ajusta según tus reglas):
    // 1. El nodo inicial solo puede tener aristas con valor 0 o 1.
    if (fromNode.isInitial && !(value === 0 || value === 1)) {
      throw new Error(
        `El nodo inicial solo puede tener aristas con valor 0 o 1.`
      );
    }

    // 2. El nodo final no debería tener aristas salientes.
    if (fromNode.isFinal) {
      throw new Error(`El nodo final no puede tener aristas salientes.`);
    }

    // 3. La arista hacia el nodo final debe ser 1 o 2 (opcional).
    if (toNode.isFinal && !(value === 1 || value === 2)) {
      throw new Error(`La arista hacia el nodo final debe tener valor 1 o 2.`);
    }

    // Construimos la arista
    const edge: Edge = {
      source: from,
      target: to,
      value,
    };

    // Se agrega la arista a la lista de aristas salientes del nodo origen.
    fromNode.outgoingEdges.push(edge);

    // Se agrega la misma arista a la lista de aristas entrantes del nodo destino.
    toNode.incomingEdges.push(edge);
  }

  /**
   * Obtiene un nodo por su id.
   * @param id Identificador del nodo
   */
  public getNode(id: string): Node | undefined {
    return this.nodes.get(id);
  }

  /**
   * Retorna todos los nodos del grafo.
   */
  public getAllNodes(): Node[] {
    return Array.from(this.nodes.values());
  }

  /**
   * Imprime el grafo en la terminal.
   * Por cada nodo se muestran:
   * - Su identificador y si es nodo inicial o final.
   * - Lista de aristas salientes.
   * - Lista de aristas entrantes.
   */
  public printGraph(): void {
    this.nodes.forEach((node) => {
      const etiquetas: string[] = [];
      if (node.isInitial) etiquetas.push('Inicio');
      if (node.isFinal) etiquetas.push('Final');

      console.log(
        `Nodo: ${node.id} ${etiquetas.length ? `(${etiquetas.join(', ')})` : ''}`
      );

      console.log('  Aristas salientes:');
      if (node.outgoingEdges.length === 0) {
        console.log('    Ninguna');
      } else {
        node.outgoingEdges.forEach((edge) => {
          console.log(`    -> ${edge.target} (valor: ${edge.value})`);
        });
      }

      console.log('  Aristas entrantes:');
      if (node.incomingEdges.length === 0) {
        console.log('    Ninguna');
      } else {
        node.incomingEdges.forEach((edge) => {
          console.log(`    <- ${edge.source} (valor: ${edge.value})`);
        });
      }

      console.log('-------------------------------------');
    });
  }

  public drawGraph(): void {
    // Paso 1: Calcular niveles para cada nodo.
    // Se asume que los nodos iniciales están en el nivel 0.
    const levels = new Map<string, number>();
    this.nodes.forEach((node, id) => {
      // Inicialmente asignamos 0 a todos, pero los iniciales
      // se consideran nivel 0.
      levels.set(id, node.isInitial ? 0 : 0);
    });

    // Actualiza los niveles: para cada nodo, se define su nivel
    // como el máximo de los niveles de sus predecesores + 1.
    let changed = true;
    while (changed) {
      changed = false;
      this.nodes.forEach((node, id) => {
        let maxPredLevel = -1;
        node.incomingEdges.forEach((edge) => {
          const predLevel = levels.get(edge.source)!;
          if (predLevel > maxPredLevel) {
            maxPredLevel = predLevel;
          }
        });
        const newLevel = maxPredLevel + 1;
        if (newLevel > levels.get(id)!) {
          levels.set(id, newLevel);
          changed = true;
        }
      });
    }

    // Paso 2: Agrupar nodos por nivel.
    const levelsMap = new Map<number, Node[]>();
    this.nodes.forEach((node, id) => {
      const lvl = levels.get(id)!;
      if (!levelsMap.has(lvl)) {
        levelsMap.set(lvl, []);
      }
      levelsMap.get(lvl)!.push(node);
    });

    // Ordenar los niveles de forma ascendente.
    const sortedLevels = Array.from(levelsMap.keys()).sort((a, b) => a - b);

    // Paso 3: Construir una representación en cadena del diagrama.
    let diagram = '';
    sortedLevels.forEach((lvl, index) => {
      const nodesAtLevel = levelsMap.get(lvl)!;
      // Representamos cada nodo como [id].
      const nodeLine = nodesAtLevel
        .map(
          (node) =>
            `[${node.id} - ${ucsFing.find((uc) => uc.codigoEnServicioUC === node.id)?.nombreUC}]`
        )
        .join('    ');
      diagram += nodeLine + '\n';

      // Dibujar conexiones entre nodos de este nivel y el siguiente.
      if (index < sortedLevels.length - 1) {
        nodesAtLevel.forEach((node) => {
          node.outgoingEdges.forEach((edge) => {
            const targetLevel = levels.get(edge.target);
            if (targetLevel === sortedLevels[index + 1]) {
              diagram += `      ${node.id} --(${edge.value})--> ${edge.target}\n`;
            }
          });
        });
      }
    });

    // Imprime el diagrama en consola.
    console.log(diagram);
  }
}
