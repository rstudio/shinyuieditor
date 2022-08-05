// const dev_mode = import.meta.env.DEV;

// These pull environment variables into more standard ones so they can be
// important like normal
export const DEV_MODE = import.meta.env.DEV;
export const SHOW_FAKE_PREVIEW =
  import.meta.env.VITE_SHOW_FAKE_PREVIEW === "TRUE";
export const PREBUILT_TREE = import.meta.env.VITE_PREBUILT_TREE === "TRUE";

console.log("Env variables", import.meta.env);
