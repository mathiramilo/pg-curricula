import type { UnidadCurricular } from "@/types";
import { Checkbox } from "../ui";

type UnidadCurricularItemProps = Pick<
  UnidadCurricular,
  "codigo" | "nombre" | "cursoAprobado" | "examenAprobado"
>;

export const UnidadCurricularItem = ({
  codigo,
  nombre,
  cursoAprobado,
  examenAprobado,
}: UnidadCurricularItemProps) => {
  return (
    <div className="w-full flex items-center justify-between gap-2">
      <div className="flex items-center gap-1">
        <button className="underline-offset-2 hover:underline text-sm text-fuente-principal font-light transition-all">
          {codigo} - {nombre}
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-sm text-fuente-principal font-light">
          C <Checkbox defaultChecked={cursoAprobado} />
        </div>
        <div className="flex items-center gap-1 text-sm text-fuente-principal font-light">
          E <Checkbox defaultChecked={examenAprobado} />
        </div>
      </div>
    </div>
  );
};
