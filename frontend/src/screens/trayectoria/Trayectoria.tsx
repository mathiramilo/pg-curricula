import { useState } from "react";

import { useGeneratePlan } from "@/hooks";
import { ScreenLayout } from "@/layouts";
import { ContentTrayectoria } from "./ContentTrayectoria";
import { HeaderTrayectoria } from "./HeaderTrayectoria";

const CREDITOS_POR_SEMESTRE_DEFAULT = "45";

export const TrayectoriaScreen = () => {
  const [creditos, setCreditos] = useState(CREDITOS_POR_SEMESTRE_DEFAULT);

  const { data, mutate, isLoading, isSuccess, isError } = useGeneratePlan();

  const handleGenerate = () => mutate(Number(creditos));

  const handleDownload = () => {
    console.log("handleDownload");
  };

  return (
    <ScreenLayout>
      <HeaderTrayectoria
        creditos={creditos}
        trayectoria={data}
        setCreditos={setCreditos}
        handleGenerate={handleGenerate}
        handleDownload={handleDownload}
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
