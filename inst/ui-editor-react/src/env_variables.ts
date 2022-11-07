declare var DEV_MODE_ESBUILD: boolean;
declare var SHOW_FAKE_PREVIEW_ESBUILD: boolean;
declare var TESTING_MODE_ESBUILD: boolean;

// We need to wrap in try statements because if we're not using esbuild these
// will be undefined

/**
 * Are we in development mode?
 */
export let DEV_MODE = false;
try {
  if (import.meta.env.DEV) {
    DEV_MODE = true;
  }
  if (DEV_MODE_ESBUILD) {
    DEV_MODE = true;
  }
} catch {}

/**
 * Should we show the app preview window with a fake app in it or should we hide
 * the preview window in the case a preview app destination is not provided?
 */
export let SHOW_FAKE_PREVIEW = false;
try {
  SHOW_FAKE_PREVIEW =
    import.meta.env.VITE_SHOW_FAKE_PREVIEW === "true" ??
    SHOW_FAKE_PREVIEW_ESBUILD;
} catch {}

/**
 * Is the app running in our e2e tests?
 */
export let TESTING_MODE = false;
try {
  TESTING_MODE =
    import.meta.env.VITE_TESTING_MODE === "true" ?? TESTING_MODE_ESBUILD;
} catch {}
