import axios from 'axios';

export const procesarEscolaridad = async (formData: FormData) => {
  const res = await axios.post(
    'http://localhost:8080/api/escolaridad/procesar-escolaridad',
    formData
  );

  return res.data;
};
