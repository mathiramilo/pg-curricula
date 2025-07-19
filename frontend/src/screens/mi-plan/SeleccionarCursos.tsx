import React from "react";
import { MemoizedUnidadCurricularItem, UnidadCurricularList } from "@/components";
import type { UnidadCurricular } from "@/models";

const cursosObligatorios: UnidadCurricular[] = [
    { codigo: "MAT1", nombre: "Matemática I", creditos: 6, codigoGrupoPadre: "Ciencias Básicas", nombreGrupoHijo: "Matemáticas", semestres: [1] },
    { codigo: "PROG1", nombre: "Programación I", creditos: 6, codigoGrupoPadre: "Computación", nombreGrupoHijo: "Programación", semestres: [1] },
    { codigo: "FIS1", nombre: "Física I", creditos: 6, codigoGrupoPadre: "Ciencias Básicas", nombreGrupoHijo: "Física", semestres: [1] },
    { codigo: "ALG", nombre: "Álgebra Lineal", creditos: 6, codigoGrupoPadre: "Ciencias Básicas", nombreGrupoHijo: "Matemáticas", semestres: [1] },
    { codigo: "ED", nombre: "Estructuras de Datos", creditos: 6, codigoGrupoPadre: "Computación", nombreGrupoHijo: "Programación", semestres: [2] },
    { codigo: "BD", nombre: "Bases de Datos", creditos: 6, codigoGrupoPadre: "Computación", nombreGrupoHijo: "Sistemas", semestres: [2] },
    { codigo: "SO", nombre: "Sistemas Operativos", creditos: 6, codigoGrupoPadre: "Computación", nombreGrupoHijo: "Sistemas", semestres: [3] },
    { codigo: "RED", nombre: "Redes de Computadoras", creditos: 6, codigoGrupoPadre: "Computación", nombreGrupoHijo: "Sistemas", semestres: [3] },
    { codigo: "IS", nombre: "Ingeniería de Software", creditos: 6, codigoGrupoPadre: "Computación", nombreGrupoHijo: "Sistemas", semestres: [4] },
  ];

// Agrupar unidades curriculares por área
const unidadesPorArea = cursosObligatorios.reduce((acc, unidad) => {
    if (!acc[unidad.codigoGrupoPadre]) {
      acc[unidad.codigoGrupoPadre] = [];
    }
    acc[unidad.codigoGrupoPadre].push(unidad);
    return acc;
  }, {} as Record<string, UnidadCurricular[]>);

export const SeleccionarCursos = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Cursos Obligatorios</h2>

      {/* Listado de cursos en tres columnas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cursosObligatorios.map((unidadCurricular) => (
            <MemoizedUnidadCurricularItem
                key={unidadCurricular.codigo}
                unidadCurricular={unidadCurricular}
                type="creditos"
            />
        ))}
      </div>
       <section className="grid gap-8 lg:gap-12 lg:grid-cols-3 pt-4">
         {Object.entries(unidadesPorArea).map(([area, unidades]) => (
          <UnidadCurricularList
              key={area}
              unidadesCurriculares={unidades}
              titulo={area}
              type="creditos"
          />
          ))}
      </section>
    </div>
  );
};