import type { ChildProcessWithoutNullStreams } from "child_process";
import { spawn } from "child_process";

export type LangProcess = {
  proc: ChildProcessWithoutNullStreams;
  stop: () => boolean;
  getIsRunning: () => boolean;
};
export async function startProcess(
  path_to_executable: string,
  commands: string[],
  opts: StartProcessOptions = {}
): Promise<LangProcess> {
  let logs = "";

  return new Promise<LangProcess>((resolve) => {
    const controller = new AbortController();
    const { signal } = controller;

    const spawnedProcess = spawn(path_to_executable, commands, { signal });

    spawnedProcess.on("spawn", onSpawn);
    spawnedProcess.on("error", onError);
    spawnedProcess.on("close", onClose);
    spawnedProcess.stdout.on("data", onStdout);
    spawnedProcess.stderr.on("data", onStderr);

    function gatherLogs(type: "error" | "out", logMsg: string) {
      logs += `${type}: ${logMsg}`;
    }

    function eventLog(msg: string) {
      if (!opts.verbose) return;

      // eslint-disable-next-line no-console
      console.log(
        `%c[RProc ${spawnedProcess.pid}] %c${msg
          .replaceAll(/\n$/g, "")
          .replaceAll(/\n/g, "\n\u2219\u2219\u2219 ")}`,
        "color: orangered;",
        "color: grey; opacity: 0.5"
      );
    }

    function onSpawn() {
      eventLog(`spawned`);
      clearTimeout(startTimeout);
      resolve({
        proc: spawnedProcess,
        stop,
        getIsRunning: () => spawnedProcess.exitCode === null,
      });
    }

    function onError(d: Error) {
      eventLog(`Error: \n${d.toString()}`);
      clearTimeout(startTimeout);
      opts.onError?.(d);
    }

    function onClose() {
      eventLog(`Closed`);
      clearTimeout(startTimeout);
      opts.onClose?.();
    }

    function onStdout(d: any) {
      const msg = d.toString();
      eventLog(`stdout: \n${msg}`);
      gatherLogs("out", msg);
      opts.onStdout?.(msg);
    }

    function onStderr(d: any) {
      const msg = d.toString();
      eventLog(`stderr: ${msg}`);
      gatherLogs("error", msg);
      opts.onStderr?.(msg);
    }

    function cleanupListeners() {
      // Unlisten event listeners
      spawnedProcess.off("spawn", onSpawn);
      spawnedProcess.off("error", onError);
      spawnedProcess.off("close", onClose);
      spawnedProcess.stdout.off("data", onStdout);
      spawnedProcess.stderr.off("data", onStderr);
    }

    function stop() {
      cleanupListeners();

      // Process is not active
      if (!spawnedProcess.pid || !spawnedProcess.connected) {
        return true;
      }

      eventLog(`Killing R process ${spawnedProcess.pid}`);

      return process.kill(spawnedProcess.pid);
    }

    // Start a timeout to call off the test if we fail to detect the server
    // startup message. This could happen if the log format is changed etc.
    const startTimeout = setTimeout(() => {
      stop();
      throw new Error("Starting backend server failed.\n Logs:\n" + logs);
    }, opts.timeout_ms ?? 5000);
  });
}

export type StartProcessOptions = Partial<{
  onClose: () => void;
  onError: (e: Error) => void;
  onStdout: (out: string) => void;
  onStderr: (out: string) => void;
  timeout_ms: number;
  verbose: boolean;
}>;
