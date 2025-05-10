import type { ComponentPropsWithoutRef } from "react";
import React from "react";

import { useAprobacion } from "@/hooks";
import type { UnidadCurricular, UnidadCurricularItemType } from "@/models";
import {
  useInformacionEstudianteStore,
  useUnidadCurricularModalStore,
} from "@/store";
import { capitalizeWords, cn } from "@/utils";
import { Checkbox } from "../ui";

type UnidadCurricularItemProps = ComponentPropsWithoutRef<"div"> & {
  unidadCurricular: UnidadCurricular;
  type?: UnidadCurricularItemType;
};

const UnidadCurricularItem = ({
  unidadCurricular,
  type = "aprobacion",
  className,
  ...props
}: UnidadCurricularItemProps) => {
  const { setUnidadCurricular, open } = useUnidadCurricularModalStore();

  const addUnidadCurricularCurso = useInformacionEstudianteStore(
    (state) => state.addUnidadCurricularCurso,
  );
  const addUnidadCurricularExamen = useInformacionEstudianteStore(
    (state) => state.addUnidadCurricularExamen,
  );
  const removeUnidadCurricularCurso = useInformacionEstudianteStore(
    (state) => state.removeUnidadCurricularCurso,
  );
  const removeUnidadCurricularExamen = useInformacionEstudianteStore(
    (state) => state.removeUnidadCurricularExamen,
  );

  const { cursoAprobado, examenAprobado } = useAprobacion(
    unidadCurricular.codigo,
  );

  const unidadCurricularAprobada = {
    codigo: unidadCurricular.codigo,
    nombre: unidadCurricular.nombre,
    creditos: unidadCurricular.creditos,
    nombreGrupoPadre: unidadCurricular.nombreGrupoPadre,
    nombreGrupoHijo: unidadCurricular.nombreGrupoHijo,
  };

  const handleCheckedChangeCurso = (value: boolean) => {
    if (value) {
      addUnidadCurricularCurso(unidadCurricularAprobada);
    } else {
      removeUnidadCurricularCurso(unidadCurricularAprobada);
    }
  };

  const handleCheckedChangeExamen = (value: boolean) => {
    if (value) {
      addUnidadCurricularExamen(unidadCurricularAprobada);
    } else {
      removeUnidadCurricularExamen(unidadCurricularAprobada);
    }
  };

  const handleOpenModal = () => {
    setUnidadCurricular(unidadCurricular);
    open();
  };

  return (
    <div
      className={cn(
        "w-full flex items-center justify-between gap-2",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-1">
        <button
          onClick={handleOpenModal}
          className="underline-offset-2 hover:underline text-sm text-fuente-principal font-light transition-all text-start line-clamp-1"
        >
          {unidadCurricular.codigo} - {capitalizeWords(unidadCurricular.nombre)}
        </button>
      </div>

      {type === "aprobacion" && (
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
      )}

      {type === "creditos" && (
        <span className="text-sm text-principal font-medium">
          {unidadCurricular.creditos}
        </span>
      )}
    </div>
  );
};

export const MemoizedUnidadCurricularItem = React.memo(UnidadCurricularItem);
