// These pull environment variables into more standard ones so they can be
// imported like normal

/**
 * Are we in development mode?
 */
export const DEV_MODE = import.meta.env.DEV;

/**
 * Should we show the app preview window with a fake app in it or should we hide
 * the preview window in the case a preview app destination is not provided?
 */
export const SHOW_FAKE_PREVIEW =
  import.meta.env.VITE_SHOW_FAKE_PREVIEW === "true";

/**
 * Is the app running in our e2e tests?
 */
export const TESTING_MODE = import.meta.env.VITE_TESTING_MODE === "true";
