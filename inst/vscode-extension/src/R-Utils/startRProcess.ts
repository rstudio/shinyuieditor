import type { ChildProcessWithoutNullStreams } from "child_process";
import { spawn } from "child_process";

import { getRpath } from "./setupRConnection";

export type RProcess = {
  proc: ChildProcessWithoutNullStreams;
  stop: () => boolean;
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

    function gatherLogs(type: "error" | "out", logMsg: string) {
      logs += `${type}: ${logMsg}`;
    }

    const onSpawn = () => {
      eventLog(`spawned`);
      clearTimeout(startTimeout);
      resolve({ proc: spawnedProcess, stop });
    };

    const onError = (d: Error) => {
      eventLog(`Error: \n${d.toString()}`);
      clearTimeout(startTimeout);
      opts.onError?.(d);
    };

    const onClose = () => {
      eventLog(`Closed`);
      clearTimeout(startTimeout);
      opts.onClose?.();
    };

    const onStdout = (d: any) => {
      const msg = d.toString();
      eventLog(`stdout: \n${msg}`);
      gatherLogs("out", msg);
      opts.onStdout?.(msg);
    };

    const onStderr = (d: any) => {
      const msg = d.toString();
      eventLog(`stderr: ${msg}`);
      gatherLogs("error", msg);
      opts.onStderr?.(msg);
    };

    spawnedProcess.on("spawn", onSpawn);
    spawnedProcess.on("error", onError);
    spawnedProcess.on("close", onClose);
    spawnedProcess.stdout.on("data", onStdout);
    spawnedProcess.stderr.on("data", onStderr);

    const stop = () => {
      // Process never started
      if (!spawnedProcess.pid) return true;

      eventLog(`Killing R process`);

      // Unlisten event listeners
      spawnedProcess.off("spawn", onSpawn);
      spawnedProcess.off("error", onError);
      spawnedProcess.off("close", onClose);
      spawnedProcess.stdout.off("data", onStdout);
      spawnedProcess.stderr.off("data", onStderr);

      return process.kill(spawnedProcess.pid);
    };
    // Start a timeout to call off the test if we fail to detect the server
    // startup message. This could happen if the log format is changed etc.
    const startTimeout = setTimeout(() => {
      throw new Error("Starting backend server failed.\n Logs:\n" + logs);
    }, opts.timeout_ms ?? 5000);
  });
}
