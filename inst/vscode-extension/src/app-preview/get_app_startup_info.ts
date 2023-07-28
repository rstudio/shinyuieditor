import type { Language_Mode } from "communication-types/src/AppInfo";

import { getPythonAppStartupInfo } from "./get_python_app_startup_info";
import { getRAppStartupInfo } from "./get_r_app_startup_info";
import { getRemoteSafeUrl } from "./getRemoteSafeUrl";

/**
 * Information about where the preview app is located and where we want it to
 * listen to on the network
 */
export type AppLocInfo = {
  /**
   * Path to the app directory
   */
  pathToApp: string;
  /**
   * Port to listen on
   */
  port: number;
  /**
   * Host to listen on
   */
  host: string;
};

/**
 * Information about how to start the preview app using the `startProcess()` function
 */
export type AppStartupInfo = {
  /**
   * Path to the executable for the language.
   */
  path_to_executable: string;
  /**
   * Array of commands to be passed alongside that executable. See `spawn()` for more info
   */
  startup_cmds: string[];
  /**
   * Function to determine if the app is ready to be previewed based on the logs from the process
   * @param msg Line of logs from the process running the preview app
   * @returns Whether or not the app is ready to be previewed as a boolean
   */
  get_is_ready: (msg: string) => boolean;
};

/**
 * Get the information needed to start the preview app for a given language
 * @param language Language of the app: Either `"R"` or `"PYTHON"`
 * @param app_loc_info Information about where the preview app is located and where we want it to
 * @returns Information about how to start the preview app using the `startProcess()` function
 */
export async function getAppStartupInfo(
  language: Language_Mode,
  app_loc_info: AppLocInfo
) {
  const [previewAppUri, startup_info] = await Promise.all([
    getRemoteSafeUrl(app_loc_info.port),
    language === "R"
      ? getRAppStartupInfo(app_loc_info)
      : getPythonAppStartupInfo(app_loc_info),
  ]);

  return {
    ...startup_info,
    previewAppUri,
  };
}
