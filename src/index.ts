import { exec } from 'child_process'
import express, { Express, Request, Response } from 'express'

import UcPrevs from '../data/proyecto-de-grado.json'
import satisfiesPrevs from './satisfiesPrevs'

const fileName = 'esc-ri.pdf'
const app: Express = express()

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!')

  exec(`python3 src/scripts/pdf-reader.py uploads/${fileName} --wir`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`)
      return
    }

    // console.log("Student data:", stdout) // Debug
    const studentData = JSON.parse(stdout)

    const satisfies = satisfiesPrevs(studentData, UcPrevs.prevs)
    console.log('Satisfies prevs:', satisfies)
  })
})

app.listen(8080, async () => {
  console.log('Server is running at http://localhost:8080')
})
