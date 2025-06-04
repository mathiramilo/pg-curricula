import { useId } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components";
import type { ReglaPreviaturas } from "@/models";
import { capitalizeWords } from "@/utils";

function ruleLabel(rule: ReglaPreviaturas): string {
  switch (rule?.regla) {
    case "AND":
      return "Todas las siguientes";
    case "OR":
      return "Alguna de las siguientes";
    case "NOT":
      return "Ninguna de las siguientes";
    case "SOME":
      return `${rule.cantidad === 1 ? "Alguna" : rule.cantidad} de las siguientes`;
    case "UC":
      return `${rule.tipoInstancia === "C" ? "Curso" : "Examen"}: ${rule.codigo} – ${capitalizeWords(rule.nombre)}`;
    case "CREDITOS_GRUPO":
      return `${rule.cantidad} créditos en el grupo ${capitalizeWords(rule.nombre)}`;
    case "CREDITOS_PLAN":
      return `${rule.cantidad} créditos en la carrera`;
    default:
      return "";
  }
}

interface PreviaturasTreeProps {
  previaturas: ReglaPreviaturas;
}

export const PreviaturasTree = ({ previaturas }: PreviaturasTreeProps) => {
  const id = useId();

  const isLeaf =
    previaturas?.regla === "UC" ||
    previaturas?.regla === "CREDITOS_GRUPO" ||
    previaturas?.regla === "CREDITOS_PLAN";

  if (isLeaf) {
    return (
      <p className="py-1 text-sm text-fuente-principal line-clamp-1">
        {ruleLabel(previaturas)}
      </p>
    );
  }

  const children =
    previaturas?.regla === "NOT"
      ? [previaturas?.previas]
      : previaturas?.previas;

  return (
    <Accordion type="multiple">
      <AccordionItem value={id}>
        <AccordionTrigger>{ruleLabel(previaturas)}</AccordionTrigger>
        <AccordionContent className="pl-4">
          {children?.map((child, idx) => (
            <PreviaturasTree key={`${id}-${idx}`} previaturas={child} />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
