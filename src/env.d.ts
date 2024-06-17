interface ImportMetaEnv {
  readonly VITE_X_API_KEY: string;
  readonly VITE_JWT_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}