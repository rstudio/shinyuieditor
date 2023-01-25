declare var TESTING_MODE_ESBUILD: boolean;

// We need to wrap in try statements because if we're not using esbuild these
// will be undefined

/**
 * Is the app running in our e2e tests?
 */
export let TESTING_MODE = false;
try {
  TESTING_MODE = TESTING_MODE_ESBUILD;
} catch {}
