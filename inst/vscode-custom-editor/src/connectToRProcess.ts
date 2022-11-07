import { ChildProcessWithoutNullStreams, spawn } from "child_process";

const STARTUP_TIMEOUT_MS = 5000;

const STARTUP_COMMAND = `library(shinyuieditor)`;
const findReadyToGo = />/;

export type ActiveRSession = {
  proc: ChildProcessWithoutNullStreams;
  sendMsg: (msg: string) => void;
};

export function connectToRProcess({
  pathToR,
}: {
  pathToR: string;
}): Promise<ActiveRSession | null> {
  let logs = "";
  let running = false;

  return new Promise<ActiveRSession | null>((resolve) => {
    const controller = new AbortController();
    const { signal } = controller;
    const spawnedProcess = spawn("R", ["--no-save"], {
      signal,
    });

    function sendMsg(msg: string) {
      spawnedProcess.stdin.write(`${msg}\n`);
    }
    function gatherLogs(type: "error" | "out", logMsg: string) {
      console.log(`${type} log:`, logMsg);
      logs += `${type}: ${logMsg}`;
    }
    spawnedProcess.stdout.on("data", (d) => {
      const logMsg = d.toString();
      gatherLogs("out", logMsg);

      if (!running && findReadyToGo.test(logMsg)) {
        resolve({
          proc: spawnedProcess,
          sendMsg,
        });
        clearTimeout(startTimeout);
        sendMsg(STARTUP_COMMAND);
        running = true;
      }
    });

    spawnedProcess.stderr.on("data", (d) => {
      const logMsg = d.toString();
      gatherLogs("error", logMsg);
    });

    spawnedProcess.on("close", () => {
      console.log("Spun up R process has shut down");
    });

    // Start a timeout to call off the test if we fail to detect the server
    // startup message. This could happen if the log format is changed etc.
    const startTimeout = setTimeout(() => {
      console.error("Starting backend server failed.\n Logs:\n" + logs);
      resolve(null);
    }, STARTUP_TIMEOUT_MS);
  });
}
