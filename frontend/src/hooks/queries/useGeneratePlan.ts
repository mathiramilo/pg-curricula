import { useMutation } from "react-query";

import { generatePlan } from "@/api";

export const useGeneratePlan = () => {
  return useMutation({
    mutationFn: (creditosPorSemestre: number) =>
      generatePlan(creditosPorSemestre),
  });
};
