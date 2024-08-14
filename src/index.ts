import { exec } from 'child_process'
import csv from 'csv-parser'
import express, { Express, Request, Response } from 'express'
import fs from 'fs'

import UcPrevs from '../data/proyecto-de-grado.json'
import satisfiesPrevs from './satisfiesPrevs'

const fileName = 'esc-ri.pdf'
const app: Express = express()

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!')

  // exec(`python3 src/scripts/pdf-reader.py ${fileName} --wir`, (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`exec error: ${error}`)
  //     return
  //   }
  //   if (stderr) {
  //     console.error(`stderr: ${stderr}`)
  //     return
  //   }

  //   // console.log("Student data:", stdout) // Debug
  //   const studentData = JSON.parse(stdout)

  //   const satisfies = satisfiesPrevs(studentData, UcPrevs.prevs)
  //   console.log('Satisfies prevs:', satisfies)
  // })
})

app.listen(8080, async () => {
  console.log('Server is running at http://localhost:8080')
})

// const materias: Object[] = []

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
//     })
//   })
//   .on('end', () => {
//     console.log('CSV file successfully processed')

//     console.log(materias)
//   })

// const listaMateriasComputacion: Object = {}
// fs.createReadStream('data/lista_materias_computacion.csv')
//   .pipe(csv())
//   .on('data', (row) => {
//     // Convertir el cod_materia a número para usarlo como clave
//     // Estaria bueno usar cod_materia porque son todos numeros pero la refencia de cod_elemento no esta bien,
//     // ejemplo Fundamentos Base de datos
//     const codMateria = row.codenservicio_mat

//     // Guardar la materia en el objeto
//     listaMateriasComputacion[codMateria] = row
//   })
//   .on('end', () => {
//     console.log('CSV file successfully processed')

//     console.log(listaMateriasComputacion) // Muestra todas las materias
//   })
