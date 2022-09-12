/// <reference types="vite/client" />

type ENV_BOOLEAN = "true" | "false";
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_SHOW_FAKE_PREVIEW: ENV_BOOLEAN;
  readonly VITE_TESTING_MODE: ENV_BOOLEAN;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
