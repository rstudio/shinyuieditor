/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_SHOW_FAKE_PREVIEW: "True" | "False";
  readonly VITE_PREBUILT_TREE?: "True";
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
