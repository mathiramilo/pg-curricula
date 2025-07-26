import { useMutation } from "@tanstack/react-query";

import { procesarEscolaridad } from "@/api";

export const useProcesarEscolaridad = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => procesarEscolaridad(formData),
  });
};
