import type { ChildProcessWithoutNullStreams } from "child_process";
import { spawn } from "child_process";

import { getRpath } from "./setupRConnection";

export type RProcess = {
  proc: ChildProcessWithoutNullStreams;
  stop: () => void;
};

export type RunRCommandOptions = Partial<{
  onClose: () => void;
  onError: (e: Error) => void;
  onStdout: (out: string) => void;
  onStderr: (out: string) => void;
  timeout_ms: number;
  verbose: boolean;
}>;

export async function startRProcess(
  commands: string[],
  opts: RunRCommandOptions = {}
) {
  const pathToR = await getRpath();
  if (pathToR === undefined) {
    throw new Error("Can't get R path");
  }
  let logs = "";

  return new Promise<RProcess>((resolve) => {
    const controller = new AbortController();
    const { signal } = controller;

    const eventLog = (msg: string) =>
      opts.verbose
        ? // eslint-disable-next-line no-console
          console.log(
            `%c[RProc ${spawnedProcess.pid}] %c${msg
              .replaceAll(/\n$/g, "")
              .replaceAll(/\n/g, "\n\u2219\u2219\u2219 ")}`,
            "color: orangered;",
            "color: grey; opacity: 0.5"
          )
        : null;

    const spawnedProcess = spawn(pathToR, commands, { signal });

    const stop = () => {
      // Process never started
      if (!spawnedProcess.pid) return;

      eventLog(`Killing R process`);

      process.kill(spawnedProcess.pid);
    };

    function gatherLogs(type: "error" | "out", logMsg: string) {
      logs += `${type}: ${logMsg}`;
    }

    spawnedProcess.on("spawn", () => {
      eventLog(`spawned`);
      clearTimeout(startTimeout);
      resolve({ proc: spawnedProcess, stop });
    });

    spawnedProcess.on("error", (d) => {
      eventLog(`Error: \n${d.toString()}`);
      clearTimeout(startTimeout);
      opts.onError?.(d);
    });

    spawnedProcess.on("close", () => {
      eventLog(`Closed`);
      clearTimeout(startTimeout);
      opts.onClose?.();
    });

    spawnedProcess.stdout.on("data", (d) => {
      const msg = d.toString();
      eventLog(`stdout: \n${msg}`);
      gatherLogs("out", msg);
      opts.onStdout?.(msg);
    });

    spawnedProcess.stderr.on("data", (d) => {
      const msg = d.toString();
      eventLog(`stderr: ${msg}`);
      gatherLogs("error", msg);
      opts.onStderr?.(msg);
    });

    // Start a timeout to call off the test if we fail to detect the server
    // startup message. This could happen if the log format is changed etc.
    const startTimeout = setTimeout(() => {
      throw new Error("Starting backend server failed.\n Logs:\n" + logs);
    }, opts.timeout_ms ?? 5000);
  });
}
