// These pull environment variables into more standard ones so they can be
// imported like normal

declare var DEV_MODE_ESBUILD: boolean;
declare var SHOW_FAKE_PREVIEW_ESBUILD: boolean;
declare var TESTING_MODE_ESBUILD: boolean;

// We need to wrap in try statements because if we're not using esbuild these
// will be undefined

/**
 * Are we in development mode?
 */
export let DEV_MODE = true;
try {
  DEV_MODE = DEV_MODE_ESBUILD ?? true;
} catch {}

/**
 * Should we show the app preview window with a fake app in it or should we hide
 * the preview window in the case a preview app destination is not provided?
 */
export let SHOW_FAKE_PREVIEW = false;
try {
  SHOW_FAKE_PREVIEW = SHOW_FAKE_PREVIEW_ESBUILD;
} catch {}

/**
 * Is the app running in our e2e tests?
 */
export let TESTING_MODE = false;
try {
  TESTING_MODE = TESTING_MODE_ESBUILD;
} catch {}
