import unidadesCurriculares from '../../data/unidades-curriculares.json';

export type EdgeValue = 0 | 1 | 2;

export interface Edge {
  source: string;
  target: string;
  value: EdgeValue;
}

interface Node {
  id: string;
  outgoingEdges: Edge[];
  incomingEdges: Edge[];
  isInitial: boolean;
  isFinal: boolean;
}

export class Graph {
  private nodes: Map<string, Node>;

  constructor() {
    this.nodes = new Map<string, Node>();
  }

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

  public addEdge(from: string, to: string, value: EdgeValue): void {
    const fromNode = this.nodes.get(from);
    const toNode = this.nodes.get(to);

    if (!fromNode || !toNode) {
      throw new Error(
        `No se puede crear la arista. Uno de los nodos (${from}, ${to}) no existe.`
      );
    }

    if (fromNode.isInitial && !(value === 0 || value === 1)) {
      throw new Error(
        `El nodo inicial solo puede tener aristas con valor 0 o 1.`
      );
    }

    if (fromNode.isFinal) {
      throw new Error(`El nodo final no puede tener aristas salientes.`);
    }

    if (toNode.isFinal && !(value === 1 || value === 2)) {
      throw new Error(`La arista hacia el nodo final debe tener valor 1 o 2.`);
    }

    const edge: Edge = {
      source: from,
      target: to,
      value,
    };

    fromNode.outgoingEdges.push(edge);
    toNode.incomingEdges.push(edge);
  }

  public getNode(id: string): Node | undefined {
    return this.nodes.get(id);
  }

  public getAllNodes(): Node[] {
    return Array.from(this.nodes.values());
  }

  /**
   * Realiza un ordenamiento topologico del grafo utilizando DFS.
   *
   * @returns Devuelve un arreglo con los nodos ordenados topologicamente.
   * @throws Error si el grafo tiene un ciclo.
   */
  public topologicalSort(): Node[] {
    const visited = new Set<string>();
    const visiting = new Set<string>();
    const stack: Node[] = [];

    const visit = (node: Node) => {
      if (visiting.has(node.id)) throw new Error(`El grafo tiene un ciclo.`);
      if (visited.has(node.id)) return;

      visiting.add(node.id);

      node.outgoingEdges.forEach((edge) => {
        const targetNode = this.nodes.get(edge.target);
        if (targetNode) {
          visit(targetNode);
        }
      });

      visiting.delete(node.id);
      visited.add(node.id);
      stack.push(node);
    };

    this.nodes.forEach((node) => {
      visit(node);
    });

    return stack.reverse();
  }

  /**
   * Calcula los nodos críticos del grafo.
   *
   * @returns Devuelve un objeto con los nodos críticos, el tiempo total de finalización, los tiempos de inicio más temprano y más tardío, y la holgura.
   * @throws Error si el grafo tiene un ciclo o si un nodo no tiene un tiempo de finalización definido.
   */
  public criticalPath() {
    const sortedNodes = this.topologicalSort();

    const ES = new Map<string, number>();
    const LS = new Map<string, number>();

    for (const node of sortedNodes) {
      const es =
        node.incomingEdges.length > 0
          ? Math.max(
              ...node.incomingEdges.map((edge) => {
                const predES = ES.get(edge.source);

                if (predES === undefined)
                  throw new Error(
                    `El nodo ${edge.source} no tiene un tiempo de finalización definido.`
                  );

                return predES + edge.value;
              })
            )
          : 0;

      ES.set(node.id, es);
    }

    const minimalDuration = Math.max(...Array.from(ES.values()));

    for (const node of sortedNodes.reverse()) {
      const ls =
        node.outgoingEdges.length > 0
          ? Math.min(
              ...node.outgoingEdges.map((edge) => {
                const succLS = LS.get(edge.target);

                if (succLS === undefined)
                  throw new Error(
                    `El nodo ${edge.target} no tiene un tiempo de inicio definido.`
                  );

                return succLS - edge.value;
              })
            )
          : minimalDuration;

      LS.set(node.id, ls);
    }

    const slack = new Map<string, number>();
    const criticalPath = new Set<string>();

    for (const node of sortedNodes) {
      const es = ES.get(node.id)!;
      const ls = LS.get(node.id)!;
      slack.set(node.id, ls - es);

      if (slack.get(node.id) === 0) {
        criticalPath.add(node.id);
      }
    }

    return {
      minimalDuration,
      ES,
      LS,
      slack,
      criticalPath,
    };
  }

  public print(): void {
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

  public draw(): void {
    const levels = new Map<string, number>();
    this.nodes.forEach((node, id) => {
      levels.set(id, node.isInitial ? 0 : 0);
    });

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

    const levelsMap = new Map<number, Node[]>();
    this.nodes.forEach((node, id) => {
      const lvl = levels.get(id)!;
      if (!levelsMap.has(lvl)) {
        levelsMap.set(lvl, []);
      }
      levelsMap.get(lvl)!.push(node);
    });

    const sortedLevels = Array.from(levelsMap.keys()).sort((a, b) => a - b);

    let diagram = '';
    sortedLevels.forEach((lvl, index) => {
      const nodesAtLevel = levelsMap.get(lvl)!;
      const nodeLine = nodesAtLevel
        .map(
          (node) =>
            `[${node.id} - ${unidadesCurriculares.find((uc) => uc.codigo === node.id)?.nombre}]`
        )
        .join('    ');
      diagram += nodeLine + '\n';

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

    console.log(diagram);
  }
}
