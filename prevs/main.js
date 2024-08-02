const prevs = require("./data/proyecto-de-grado.json")
const esc = require("./data/student-esc.json")

function serializeEsc(esc) {
  let totalCredits = 0
  let basicCredits = {
    total: 0,
    math: 0,
    experimentalSciences: 0
  }
  let basicTecCredits = {
    total: 0,
    programing: 0,
    architectureSoNetworks: 0,
    AI: 0,
    databases: 0,
    numericalCalc: 0,
    operativeInvestigation: 0,
    softwareEngineering: 0,
    integralProjects: 0,
    organizationManagement: 0
  }
  let complementaryCredits = {
    total: 0,
    humanSocialSciences: 0
  }
  let optCredits = {
    total: 0,
    optionals: 0
  }

  let subjectsList = []

  esc["Materias Basicas"]["Matematica"].forEach(subject => {
    subjectsList.push(subject)

    if (subject.status === "Examen") {
      totalCredits += subject.credits
      basicCredits.total += subject.credits
      basicCredits.math += subject.credits
    }
  })

  esc["Materias Basicas"]["Ciencias Experimentales"].forEach(subject => {
    subjectsList.push(subject)

    if (subject.status === "Examen") {
      totalCredits += subject.credits
      basicCredits.total += subject.credits
      basicCredits.math += subject.credits
    }
  })

  esc["Basico-Tec,Tecnicas e Integ."]["Matematica"].forEach(subject => {
    subjectsList.push(subject)

    if (subject.status === "Examen") {
      totalCredits += subject.credits
      basicCredits.total += subject.credits
      basicCredits.math += subject.credits
    }
  })

  return {
    totalCredits,
    basicCredits,
    basicTecCredits,
    complementaryCredits,
    optCredits,
    subjectsList
  }
}

function satisfiesPrevs(student, prevs) {}

serializeEsc(esc)
