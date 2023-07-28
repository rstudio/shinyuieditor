import type { Language_Mode } from "communication-types/src/AppInfo";

import type { LangProcess } from "../startProcess";
import { startProcess } from "../startProcess";

import { getAppStartupInfo } from "./get_app_startup_info";
import { getFreePort } from "./getFreePort";

export function startPreviewApp({
  language,
  pathToApp,
  onCrash,
  onInitiation,
  onReady,
  onFailToStart,
  onLogs,
}: {
  language: Language_Mode;
  pathToApp: string;
  onInitiation: () => void;
  onReady: (url: string) => void;
  onFailToStart: () => void;
  onCrash: () => void;
  onLogs: (logs: string[]) => void;
}): {
  start: () => Promise<boolean>;
  stop: () => boolean;
} {
  // This will need to change to also handle python processes
  let appProcess: LangProcess | null = null;

  async function startApp() {
    onInitiation();

    // If there is an existing app process and it can still have messages
    // communicated with it, we need to kill it Restarting existing app
    // process.
    stopApp();

    try {
      const { path_to_executable, startup_cmds, get_is_ready, previewAppUri } =
        await getAppStartupInfo(language, {
          host: "0.0.0.0",
          pathToApp,
          port: await getFreePort(),
        });

      appProcess = await startProcess(path_to_executable, startup_cmds, {
        onStderr(msg) {
          if (get_is_ready(msg)) {
            onReady(previewAppUri);
          }
          onLogs(msg.split("\n"));
        },
        onClose: onCrash,
        onError: onCrash,
      });

      return true;
    } catch {
      onFailToStart();
      return false;
    }
  }

  function stopApp() {
    if (appProcess === null) {
      // No app to stop running...
      return true;
    }

    return appProcess.stop();
  }

  return {
    start: startApp,
    stop: stopApp,
  };
}
