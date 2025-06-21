import previaturas from "@/data/previaturas.json";
import ucsAnuales from "@/data/ucs-anuales.json";
import unidadesCurriculares from "@/data/unidades-curriculares.json";
import { cumplePreviaturas } from "@/services";
import {
  InformacionEstudiante,
  ReglaPreviaturas,
  SemestreDeDictado,
  UnidadCurricular,
} from "@/types";
import {
  actualizarInformacionEstudiante,
  getInitialYear,
  seDictaEsteSemestre,
} from "@/utils";

const previaturasTyped = previaturas as Record<string, ReglaPreviaturas>;

export type EdgeValue = 0 | 1 | 2 | 3; // 3 es para el caso de que la unidad curricular previa se dicte ambos semestres y la actual solo uno

export interface Edge {
  source: string;
  target: string;
  value: EdgeValue;
}

interface Node {
  id: string;
  unidadCurricular?: UnidadCurricular;
  outgoingEdges: Edge[];
  incomingEdges: Edge[];
  isInitial: boolean;
  isFinal: boolean;
}

interface AddNodeParams {
  id: string;
  unidadCurricular?: UnidadCurricular;
  isInitial?: boolean;
  isFinal?: boolean;
}

interface ScheduleObject {
  semestre: number;
  unidadesCurriculares: UnidadCurricular[];
  creditos: number;
  label?: string;
}

export class Graph {
  private nodes: Map<string, Node>;
  private unidadesCurricularesSinPrevias: UnidadCurricular[]; // Utilizamos este array para almacenar las unidades curriculares que no tienen previaturas en el grafo (ej: unidades curriculares con previaturas de creditos). Las iremos agregando a la planificacion a medida se vayan encontrando huecos.

  constructor() {
    this.nodes = new Map<string, Node>();
    this.unidadesCurricularesSinPrevias = [];
  }

  public addNode({
    id,
    unidadCurricular,
    isInitial = false,
    isFinal = false,
  }: AddNodeParams): void {
    if (this.nodes.has(id)) {
      throw new Error(`Ya existe un nodo con id '${id}'.`);
    }

    const newNode: Node = {
      id,
      unidadCurricular,
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
        `No se puede crear la arista. Uno de los nodos (${from}, ${to}) no existe.`,
      );
    }

    if (fromNode.isInitial && !(value === 0 || value === 1)) {
      throw new Error(
        `El nodo inicial solo puede tener aristas con valor 0 o 1.`,
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

  public updateEdgeDependingOnSemester(
    targetNode: Node,
    semester: number,
    edge: Edge,
  ) {
    const targetSemestres = targetNode.unidadCurricular?.semestres;
    if (targetSemestres && targetSemestres.length > 0) {
      const isOdd = semester % 2 === 1;
      const isEven = semester % 2 === 0;

      if (
        (isOdd && targetSemestres[0] === "1") ||
        (isEven && targetSemestres[0] === "2")
      ) {
        edge.value = 2;
      } else {
        edge.value = 1;
      }
    }
  }

  public getNode(id: string): Node | undefined {
    return this.nodes.get(id);
  }

  public getAllNodes(): Node[] {
    return Array.from(this.nodes.values());
  }

  public addUnidadCurricularSinPrevias(
    unidadCurricular: UnidadCurricular,
  ): void {
    this.unidadesCurricularesSinPrevias.push(unidadCurricular);
  }

  public getUnidadesCurricularesSinPrevias() {
    return this.unidadesCurricularesSinPrevias;
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
                    `El nodo ${edge.source} no tiene un tiempo de finalización definido.`,
                  );

                return predES + edge.value;
              }),
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
                    `El nodo ${edge.target} no tiene un tiempo de inicio definido.`,
                  );

                return succLS - edge.value;
              }),
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

  public schedule(
    initialSemester: SemestreDeDictado,
    maxCredits: number,
    informacionEstudiante: InformacionEstudiante,
  ): ScheduleObject[] | boolean {
    const MAX_CREDITS_THRESHOLD = 1.12;

    const { ES, slack: holgura } = this.criticalPath();

    ES.delete("inicio");
    ES.delete("fin");

    const plan: ScheduleObject[] = [];

    let semester = initialSemester === "1" ? 1 : 2;
    let actualYear = getInitialYear(initialSemester);

    // REVIEW: Es posible que tengamos para asignar 2 unidades curriculares anuales en el proximo semestre?
    let creditsNextSemester = 0;
    let ucNextSemester: UnidadCurricular | null = null;

    while (
      ES.size > 0 ||
      this.getUnidadesCurricularesSinPrevias().length > 0 ||
      creditsNextSemester > 0
    ) {
      // Obtenemos los nodos que se pueden programar en el semestre actual ordenados por holgura para agregar primero los criticos
      const available = Array.from(ES.entries())
        .filter(([_, es]) => es <= semester - 1)
        .map(([id, es]) => ({
          id,
          es,
          holgura: holgura.get(id)!,
        }))
        .sort((a, b) => a.holgura - b.holgura);

      const scheduleObject: ScheduleObject = {
        semestre: semester,
        unidadesCurriculares: [],
        creditos: 0,
        label: `${semester % 2 === 1 ? "1er" : "2do"} semestre ${actualYear}`,
      };

      const remaining = [...available];

      let totalCredits = creditsNextSemester;

      if (ucNextSemester)
        scheduleObject.unidadesCurriculares.push(ucNextSemester);

      scheduleObject.creditos += creditsNextSemester;

      creditsNextSemester = 0;
      ucNextSemester = null;

      for (const node of available) {
        const nodeObject = this.nodes.get(node.id);
        const unidadCurricular = nodeObject!.unidadCurricular!;

        // Si la unidad curricular no se dicta en el semestre actual o no cumple con las previas, se salta a la siguiente
        if (
          !seDictaEsteSemestre(semester, unidadCurricular.semestres!) ||
          !cumplePreviaturas(
            informacionEstudiante,
            previaturasTyped[unidadCurricular.codigo],
          )
        ) {
          continue;
        }

        const isAnual = ucsAnuales.includes(unidadCurricular.codigo);

        if (
          isAnual
            ? totalCredits + unidadCurricular.creditos / 2 <=
              maxCredits * MAX_CREDITS_THRESHOLD
            : totalCredits + unidadCurricular.creditos <=
              maxCredits * MAX_CREDITS_THRESHOLD
        ) {
          scheduleObject.unidadesCurriculares.push(unidadCurricular);

          // Si la unidad curricular es anual se le suman la mitad de los creditos al semestre actual y la otra mitad al proximo
          if (isAnual) {
            scheduleObject.creditos += unidadCurricular.creditos / 2;
            totalCredits += unidadCurricular.creditos / 2;

            creditsNextSemester = unidadCurricular.creditos / 2;
            ucNextSemester = unidadCurricular;
          } else {
            scheduleObject.creditos += unidadCurricular.creditos;
            totalCredits += unidadCurricular.creditos;
          }

          ES.delete(node.id);
          remaining.splice(remaining.indexOf(node), 1);

          if (nodeObject?.outgoingEdges.some((edge) => edge.value === 3)) {
            nodeObject.outgoingEdges.forEach((edge) => {
              if (edge.value !== 3) return;

              const targetNode = this.nodes.get(edge.target)!;
              this.updateEdgeDependingOnSemester(targetNode, semester, edge);
            });

            return false;
          }

          continue;
        }

        // Si no se puede agregar la unidad curricular por exceso de creditos, se tiene que avanzar al siguiente semestre
        break;
      }

      // Buscamos si podemos agregar alguna del pool de UCs sin previas
      const ucsAvailableToAdd = this.unidadesCurricularesSinPrevias.filter(
        (uc) =>
          cumplePreviaturas(
            informacionEstudiante,
            previaturasTyped[uc.codigo],
          ) && seDictaEsteSemestre(semester, uc.semestres!),
      );

      for (const uc of ucsAvailableToAdd) {
        if (totalCredits + uc.creditos > maxCredits * MAX_CREDITS_THRESHOLD)
          continue;

        scheduleObject.unidadesCurriculares.push(uc);
        scheduleObject.creditos += uc.creditos || 0;
        totalCredits += uc.creditos || 0;
        this.unidadesCurricularesSinPrevias.splice(
          this.unidadesCurricularesSinPrevias.indexOf(uc),
          1,
        );
      }

      // Actualizamos la informacion del estudiante al terminar de asignar las unidades curriculares al semestre
      scheduleObject.unidadesCurriculares.forEach((uc) => {
        actualizarInformacionEstudiante(
          informacionEstudiante,
          uc,
          uc.nombreGrupoHijo,
        );
      });

      semester++;
      actualYear += semester % 2 === 1 ? 1 : 0;
      totalCredits = 0;

      remaining.forEach((node) => {
        ES.set(node.id, node.es + 1);
        holgura.set(node.id, node.holgura - 1);
      });

      plan.push(scheduleObject);
    }

    return plan;
  }

  public scheduleFinal(
    initialSemester: SemestreDeDictado,
    maxCredits: number,
    informacionEstudiante: InformacionEstudiante,
  ) {
    let plan = this.schedule(
      initialSemester,
      maxCredits,
      structuredClone(informacionEstudiante),
    );

    while (!plan) {
      plan = this.schedule(
        initialSemester,
        maxCredits,
        structuredClone(informacionEstudiante),
      );
    }

    return plan;
  }

  public print(): void {
    this.nodes.forEach((node) => {
      const etiquetas: string[] = [];
      if (node.isInitial) etiquetas.push("Inicio");
      if (node.isFinal) etiquetas.push("Final");

      console.log(
        `Nodo: ${node.id} ${etiquetas.length ? `(${etiquetas.join(", ")})` : ""}`,
      );

      console.log("  Aristas salientes:");
      if (node.outgoingEdges.length === 0) {
        console.log("    Ninguna");
      } else {
        node.outgoingEdges.forEach((edge) => {
          console.log(`    -> ${edge.target} (valor: ${edge.value})`);
        });
      }

      console.log("  Aristas entrantes:");
      if (node.incomingEdges.length === 0) {
        console.log("    Ninguna");
      } else {
        node.incomingEdges.forEach((edge) => {
          console.log(`    <- ${edge.source} (valor: ${edge.value})`);
        });
      }

      console.log("-------------------------------------");
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

    let diagram = "";
    sortedLevels.forEach((lvl, index) => {
      const nodesAtLevel = levelsMap.get(lvl)!;
      const nodeLine = nodesAtLevel
        .map(
          (node) =>
            `[${node.id} - ${unidadesCurriculares.find((uc) => uc.codigo === node.id)?.nombre}]`,
        )
        .join("    ");
      diagram += nodeLine + "\n";

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
