const { exec } = require("child_process")

const UcPrevs = require("./data/proyecto-de-grado.json")
const satisfiesPrevs = require("./satisfiesPrevs")

const fileName = "esc-ri.pdf"

exec(`py scripts/pdf-reader.py uploads/${fileName} --wir`, (error, stdout, stderr) => {
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
  console.log("Satisfies prevs:", satisfies)
})
