const { API_URL, API_KEY } = window.__ENV__ || {};

export const ENV = {
  API_URL: (import.meta.env.VITE_API_URL as string) ?? API_URL,
  API_KEY: (import.meta.env.VITE_API_KEY as string) ?? API_KEY,
} as const;
