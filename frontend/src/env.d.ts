interface EnvConfig {
  API_URL: string;
  API_KEY: string;
}

declare global {
  interface Window {
    __ENV__: EnvConfig;
  }
}

export {};
