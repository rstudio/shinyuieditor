// These pull environment variables into more standard ones so they can be
// imported like normal
export const DEV_MODE = import.meta.env.DEV;
export const SHOW_FAKE_PREVIEW =
  import.meta.env.VITE_SHOW_FAKE_PREVIEW === "true";
export const TESTING_MODE = import.meta.env.VITE_TESTING_MODE === "true";
