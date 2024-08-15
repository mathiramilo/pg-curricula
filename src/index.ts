import { exec } from 'child_process';
import csv from 'csv-parser';
import express, { Express, Request, Response } from 'express';
import fs from 'fs';

import UcPrevs from '../data/proyecto-de-grado.json';
import Modelos from './modelos/leerCsv';
import satisfiesPrevs from './satisfiesPrevs';

const fileName = 'esc-ri.pdf';
const app: Express = express();

enum TipoDescriptor {
  examen = 'E',
  curso = 'C',
}

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');

  // exec(`python3 src/scripts/pdf-reader.py ${fileName} --wir`, (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`exec error: ${error}`);
  //     return;
  //   }
  //   if (stderr) {
  //     console.error(`stderr: ${stderr}`);
  //     return;
  //   }

  //   // console.log("Student data:", stdout) // Debug
  //   const studentData = JSON.parse(stdout);

  //   const satisfies = satisfiesPrevs(studentData, UcPrevs.prevs);
  //   console.log('Satisfies prevs:', satisfies);
  // });
});

app.listen(8080, async () => {
  console.log('Server is running at http://localhost:8080');
});

// const materias: Object[] = [];

// fs.createReadStream('data/previaturas2.csv')
//   .pipe(csv())
//   .on('data', (row) => {
//     // Convertir las columnas relevantes a los tipos apropiados
//     materias.push({
//       cod_materia: parseInt(row.cod_materia),
//       cod_condicion_padre: row.cod_condicion_padre ? parseInt(row.cod_condicion_padre) : null,
//       tipo: row.tipo,
//       tipo_instancia: row.tipo_instancia,
//       nombre_mat: row.nombre_mat,
//       cant_creditos: row.cant_creditos ? parseInt(row.cant_creditos) : null,
//       cod_grupo: row.cod_grupo ? parseInt(row.cod_grupo) : null
//     });
//   })
//   .on('end', () => {
//     console.log('CSV file successfully processed');

//     console.log(materias);
//   });

// const listaMateriasComputacion: Object = {};
// fs.createReadStream('data/lista_materias_computacion.csv')
//   .pipe(csv())
//   .on('data', row => {
//     // Convertir el cod_materia a número para usarlo como clave
//     // Estaria bueno usar cod_materia porque son todos numeros pero la refencia de cod_elemento no esta bien,
//     // ejemplo Fundamentos Base de datos
//     const codMateria = row.codenservicio_mat;

//     // Guardar la materia en el objeto
//     listaMateriasComputacion[codMateria] = row;
//   })
//   .on('end', () => {
//     console.log('CSV file successfully processed');

//     console.log(listaMateriasComputacion); // Muestra todas las materias
//   });

const ini = async () => {
  const modelos = new Modelos();
  const previasDeExamen = await modelos.obtenerMateriasPrevias(
    TipoDescriptor.examen,
  );

  const previasDeCurso = await modelos.obtenerMateriasPrevias(
    TipoDescriptor.curso,
  );

  const tree = buildTree(previasDeCurso['1911']);
  console.log(JSON.stringify(tree, null, 2));
};
ini();

interface Materia {
  cod_materia: string;
  codenservicio_mat: string;
  nombre_mat: string;
  tipo_descriptor: string;
  cod_condicion: string;
  cod_condicion_padre: string;
  tipo: 'B' | 'N' | 'AND' | 'OR' | 'NOT';
  cantmaterias: string;
  cod_elemento: string;
  'nombre_mat-2': string;
  'codenservicio_mat-2': string;
}

interface TreeNode {
  tipo: 'B' | 'N' | 'AND' | 'OR' | 'NOT';
  cantmaterias?: string;
  hijos?: TreeNode[];
  cod_condicion: string;
}

interface LeafNode {
  cod_elemento: string;
  'nombre_mat-2': string;
  'codenservicio_mat-2': string;
}

const buildTree = (data: Materia[]): TreeNode => {
  const nodeMap = new Map<string, TreeNode>();

  // Inicializar nodos
  data.forEach(item => {
    nodeMap.set(item.cod_condicion, {
      tipo: item.tipo,
      cantmaterias: item.cantmaterias,
      hijos: [],
      cod_condicion: item.cod_condicion,
    });
  });

  // Construir árbol
  data.forEach(item => {
    const currentNode = nodeMap.get(item.cod_condicion);
    if (item.cod_condicion_padre) {
      const parentNode = nodeMap.get(item.cod_condicion_padre);
      if (parentNode) {
        parentNode.hijos!.push(currentNode!);
      }
    }
  });

  // Identificar el nodo raíz
  const root = Array.from(nodeMap.values()).find(node => node.tipo === 'AND');
  if (!root) {
    throw new Error('No root node found.');
  }

  addLeaves(root, data);

  return root;
};

// Agregar nodos hoja al árbol
const addLeaves = (node: TreeNode, data: Materia[]) => {
  const leaves = data.filter(
    item =>
      item.tipo === 'B' && item.cod_condicion_padre === node.cod_condicion,
  );
  if (leaves.length > 0) {
    node.hijos = leaves.map(leaf => ({
      cod_elemento: leaf.cod_elemento,
      'nombre_mat-2': leaf['nombre_mat-2'],
      'codenservicio_mat-2': leaf['codenservicio_mat-2'],
    }));
  } else {
    node.hijos?.forEach(child => addLeaves(child, data));
  }
};
