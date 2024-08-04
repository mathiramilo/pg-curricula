"use strict"

const UcPrevs = require("./data/proyecto-de-grado.json")
const studentData = require("./data/student-data.json")

function satisfiesPrevs(studentData, requiredPrevs) {
  if (!requiredPrevs || requiredPrevs.length === 0) {
    console.log("No prevs required")
    return true
  }

  console.log(requiredPrevs) // Debug

  try {
    switch (requiredPrevs.rule) {
      case "NOT":
        return !satisfiesPrevs(studentData, requiredPrevs.prevs)
      case "OR":
        return requiredPrevs.prevs.some(prev => satisfiesPrevs(studentData, prev))
      case "AND":
        return requiredPrevs.prevs.every(prev => satisfiesPrevs(studentData, prev))
      case "PLAN_CREDITS":
        return studentData["Creditos Totales"] >= requiredPrevs.min
      case "GROUP_CREDITS":
        return studentData[requiredPrevs.name] >= requiredPrevs.min
      case "UC":
        return studentData["UCs Aprobadas"].includes(subject => subject.name === requiredPrevs.name)
      default:
        console.log("Unknown rule:", requiredPrevs.rule)
        console.log(requiredPrevs)
        return false
    }
  } catch (error) {
    console.log("Error:", error)
    return false
  }
}

const satisfies = satisfiesPrevs(studentData, UcPrevs.prevs)
console.log("Satisfies prevs:", satisfies)
