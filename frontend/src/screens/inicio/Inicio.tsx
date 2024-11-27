import { useState } from "react";

import { ScreenLayout } from "@/layouts";
import {
  HeaderInicio,
  UnidadesCurriculares,
  UnidadesCurricularesLoading,
} from "./components";

export const InicioScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  return (
    <ScreenLayout>
      <HeaderInicio />

      {isLoading ? <UnidadesCurricularesLoading /> : <UnidadesCurriculares />}
    </ScreenLayout>
  );
};
