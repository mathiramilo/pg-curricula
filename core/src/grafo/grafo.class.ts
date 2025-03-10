import { Node, EdgeValue, Edge } from './grafo.types';

class Graph {
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
}

export default Graph;
