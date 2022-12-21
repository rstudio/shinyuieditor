import { spawn } from "child_process";

type CommandExecOptions = {
  timeout_ms?: number;
  verbose?: boolean;
  pathToR: string;
};

type CommandOutput =
  | { status: "success"; values: string[] }
  | { status: "error"; errorMsgs: string };

export async function runRCommandCold(
  command: string,
  { verbose = false, timeout_ms = 1500, pathToR }: CommandExecOptions
): Promise<CommandOutput> {
  const logger = makeLogger(verbose, "runRCommand: ");

  if (!pathToR)
    return { status: "error", errorMsgs: "Failed to start find R binary" };

  return new Promise<CommandOutput>((resolve) => {
    let outputVals: string[] = [];
    let stderrVals: string[] = [];
    const spawnedProcess = spawn(pathToR as string, [
      "-e",
      command,
      "--silent",
      "--slave",
      "--no-save",
      "--no-restore",
    ]);
    function onSpawn() {
      logger("Spawned");
    }
    function onError(e: Error) {
      logger("Error " + e.message);
      cleanup();
      resolve({ status: "error", errorMsgs: stderrVals.join("\n") });
    }
    function onClose() {
      logger("Close");
      cleanup();
      resolve({ status: "success", values: outputVals });
    }
    function onStdout(d: any) {
      logger(`stdout: ${d.toString()}`);
      outputVals.push(d.toString());
    }
    function onStderr(d: any) {
      logger(`stderr: ${d.toString()}`);
      stderrVals.push(d.toString());
    }

    function cleanup() {
      clearTimeout(startTimeout);
      spawnedProcess.off("spawn", onSpawn);
      spawnedProcess.off("error", onError);
      spawnedProcess.off("close", onClose);
      spawnedProcess.stdout.off("data", onStdout);
      spawnedProcess.stderr.off("data", onStderr);
    }

    const startTimeout = setTimeout(() => {
      resolve({
        status: "error",
        errorMsgs: `Command, no response from run command within ${timeout_ms}ms:\n${command}`,
      });
      cleanup();
    }, timeout_ms);

    spawnedProcess.on("spawn", onSpawn);
    spawnedProcess.on("error", onError);
    spawnedProcess.on("close", onClose);
    spawnedProcess.stdout.on("data", onStdout);
    spawnedProcess.stderr.on("data", onStderr);
  });
}

function makeLogger(verbose: boolean, prefix: string) {
  return (msg: string) => {
    if (verbose) {
      // eslint-disable-next-line no-console
      console.log(prefix + msg);
    }
  };
}
