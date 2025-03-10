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
