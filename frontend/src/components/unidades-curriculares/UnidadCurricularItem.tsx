import type { ComponentPropsWithoutRef } from "react";
import React from "react";

import { useAprobacion, useBoolean } from "@/hooks";
import type { UnidadCurricular } from "@/models";
import { useStore } from "@/store";
import { capitalizeWords, cn } from "@/utils";
import { UnidadCurricularModal } from "../modals";
import { Checkbox } from "../ui";

type UnidadCurricularItemProps = ComponentPropsWithoutRef<"div"> & {
  unidadCurricular: UnidadCurricular;
};

const UnidadCurricularItem = ({
  unidadCurricular,
  className,
  ...props
}: UnidadCurricularItemProps) => {
  const {
    value: showModal,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBoolean(false);

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
    unidadCurricular.codigoEnServicioUC,
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
    <>
      <div
        className={cn(
          "w-full flex items-center justify-between gap-2",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-1">
          <button
            onClick={openModal}
            className="underline-offset-2 hover:underline text-sm text-fuente-principal font-light transition-all text-start line-clamp-1"
          >
            {unidadCurricular.codigoEnServicioUC} -{" "}
            {capitalizeWords(unidadCurricular.nombreUC)}
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

      <UnidadCurricularModal
        unidadCurricular={unidadCurricular}
        open={showModal}
        onClose={closeModal}
      />
    </>
  );
};

export const MemoizedUnidadCurricularItem = React.memo(UnidadCurricularItem);
