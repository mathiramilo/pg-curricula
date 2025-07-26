import { useMutation } from "@tanstack/react-query";

import type { GeneratePlanParams } from "@/api";
import { generatePlan } from "@/api";

export const useGeneratePlan = () => {
  return useMutation({
    mutationFn: (params: GeneratePlanParams) => generatePlan(params),
  });
};
