import { MemoizedUnidadCurricularItem } from "@/components";
import { useSatisfacePreviaturas } from "@/hooks";
import type { UnidadCurricular } from "@/models";
import { useMiPlanStore } from "@/store";

interface UcCheckboxProps {
  uc: UnidadCurricular;
  isObligatoria: boolean;
}

export const UcCheckbox = ({ uc, isObligatoria }: UcCheckboxProps) => {
  const {
    informacionEstudiante,
    hasUnidadCurricular,
    addUnidadCurricular,
    removeUnidadCurricular,
    addUCToListado,
    removeUCFromListado,
  } = useMiPlanStore();

  const { data: satisfacePreviaturas } = useSatisfacePreviaturas({
    informacionEstudiante,
    codigo: uc.codigo,
  });

  const selected = hasUnidadCurricular(uc.codigo);
  const onSelectedChange = (value: boolean) => {
    if (value) {
      addUCToListado(uc);
      addUnidadCurricular(uc);
    } else {
      removeUCFromListado(uc);
      removeUnidadCurricular(uc);
    }
  };

  return (
    <MemoizedUnidadCurricularItem
      key={uc.codigo}
      unidadCurricular={uc}
      type="seleccion"
      selected={selected}
      onSelectedChange={onSelectedChange}
      isObligatoria={isObligatoria}
      noSatisfacePreviaturas={Boolean(!satisfacePreviaturas)}
    />
  );
};
