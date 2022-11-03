// These pull environment variables into more standard ones so they can be
// imported like normal

declare var DEV_MODE_ESBUILD: boolean;
declare var SHOW_FAKE_PREVIEW_ESBUILD: boolean;
declare var TESTING_MODE_ESBUILD: boolean;

/**
 * Are we in development mode?
 */
// export const DEV_MODE = import.meta.env.DEV;
export const DEV_MODE = DEV_MODE_ESBUILD;
// process.env.DEV_MODE;

/**
 * Should we show the app preview window with a fake app in it or should we hide
 * the preview window in the case a preview app destination is not provided?
 */
export const SHOW_FAKE_PREVIEW = SHOW_FAKE_PREVIEW_ESBUILD;

/**
 * Is the app running in our e2e tests?
 */
export const TESTING_MODE = TESTING_MODE_ESBUILD;

console.log("Env Vars", {
  DEV_MODE,
  TESTING_MODE,
  SHOW_FAKE_PREVIEW,
});
