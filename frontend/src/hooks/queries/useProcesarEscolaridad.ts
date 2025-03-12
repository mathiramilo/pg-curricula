import { useMutation } from "react-query";

import { procesarEscolaridad } from "@/api";

export const useProcesarEscolaridad = () => {
  return useMutation({
    mutationKey: "procesarEscolaridad",
    mutationFn: async (formData: FormData) => procesarEscolaridad(formData),
  });
};
