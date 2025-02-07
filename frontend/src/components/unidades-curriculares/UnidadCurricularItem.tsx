import { useAprobacion } from "@/hooks";
import type { UnidadCurricular } from "@/models";
import { useStore } from "@/store";
import { Checkbox } from "../ui";

interface UnidadCurricularItemProps {
  unidadCurricular: UnidadCurricular;
}

export const UnidadCurricularItem = ({
  unidadCurricular,
}: UnidadCurricularItemProps) => {
  const addUnidadCurricularCurso = useStore(
    (state) => state.addUnidadCurricularCurso,
  );
  const addUnidadCurricularExamen = useStore(
    (state) => state.addUnidadCurricularExamen,
  );
  const removeUnidadCurricularCurso = useStore(
    (state) => state.removeUnidadCurricularCurso,
  );
  const removeUnidadCurricularExamen = useStore(
    (state) => state.removeUnidadCurricularExamen,
  );

  const { cursoAprobado, examenAprobado } = useAprobacion(
    unidadCurricular.nombre,
  );

  const handleCheckedChangeCurso = (value: boolean) => {
    if (value) {
      addUnidadCurricularCurso(unidadCurricular);
    } else {
      removeUnidadCurricularCurso(unidadCurricular);
    }
  };

  const handleCheckedChangeExamen = (value: boolean) => {
    if (value) {
      addUnidadCurricularExamen(unidadCurricular);
    } else {
      removeUnidadCurricularExamen(unidadCurricular);
    }
  };

  return (
    <div className="w-full flex items-center justify-between gap-2">
      <div className="flex items-center gap-1">
        <button className="underline-offset-2 hover:underline text-sm text-fuente-principal font-light transition-all">
          {unidadCurricular.codigo} - {unidadCurricular.nombre}
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-sm text-fuente-principal font-light">
          C{" "}
          <Checkbox
            checked={cursoAprobado}
            onCheckedChange={handleCheckedChangeCurso}
          />
        </div>
        <div className="flex items-center gap-1 text-sm text-fuente-principal font-light">
          E{" "}
          <Checkbox
            checked={examenAprobado}
            onCheckedChange={handleCheckedChangeExamen}
          />
        </div>
      </div>
    </div>
  );
};
