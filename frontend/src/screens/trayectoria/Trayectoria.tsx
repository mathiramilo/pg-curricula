import { useState } from "react";

import { useGeneratePlan } from "@/hooks";
import { ScreenLayout } from "@/layouts";
import type { SemestreDeDictado } from "@/models";
import { SEMESTRE_DE_DICTADO } from "@/models";
import { ContentTrayectoria } from "./ContentTrayectoria";
import { HeaderTrayectoria } from "./HeaderTrayectoria";

const CREDITOS_POR_SEMESTRE_DEFAULT = "45";

export const TrayectoriaScreen = () => {
  const [creditos, setCreditos] = useState(CREDITOS_POR_SEMESTRE_DEFAULT);
  const [semestreInicial, setSemestreInicial] = useState<SemestreDeDictado>(
    SEMESTRE_DE_DICTADO.PRIMER_SEMESTRE,
  );

  const { data, mutate, isLoading, isSuccess, isError } = useGeneratePlan();

  const handleGenerate = () =>
    mutate({
      creditosPorSemestre: Number(creditos),
      semestreInicial,
    });

  const handleDownload = () => {
    console.log("handleDownload");
  };

  return (
    <ScreenLayout>
      <HeaderTrayectoria
        creditos={creditos}
        semestreInicial={semestreInicial}
        trayectoria={data}
        setCreditos={setCreditos}
        setSemestreInicial={setSemestreInicial}
        onGenerate={handleGenerate}
        onDownload={handleDownload}
      />
      <ContentTrayectoria
        trayectoria={data}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
      />
    </ScreenLayout>
  );
};
