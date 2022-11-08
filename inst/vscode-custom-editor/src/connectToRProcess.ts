import { ChildProcessWithoutNullStreams, spawn } from "child_process";

const STARTUP_TIMEOUT_MS = 5000;

const STARTUP_COMMAND = `library(shinyuieditor)`;
const findReadyToGo = />/;

export type ActiveRSession = {
  proc: ChildProcessWithoutNullStreams;
  runCmd: (cmd: string, timeout_ms?: number) => Promise<string[]>;
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
    const spawnedProcess = spawn(pathToR, ["--no-save"], { signal });

    const runCmd = (cmd: string, timeout_ms?: number) =>
      runRCommand(cmd, spawnedProcess, timeout_ms);

    function gatherLogs(type: "error" | "out", logMsg: string) {
      logs += `${type}: ${logMsg}`;
    }
    spawnedProcess.stdout.on("data", (d) => {
      const logMsg = d.toString();
      gatherLogs("out", logMsg);

      if (!running && findReadyToGo.test(logMsg)) {
        resolve({
          proc: spawnedProcess,
          runCmd,
        });
        clearTimeout(startTimeout);
        sendMsgToProc(STARTUP_COMMAND, spawnedProcess);
        running = true;
      }
    });

    spawnedProcess.stderr.on("data", (d) => {
      gatherLogs("error", d.toString());
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

function sendMsgToProc(msg: string, proc: ChildProcessWithoutNullStreams) {
  proc.stdin.write(`${msg}\n`);
}

const output_line_regex = /^\[\d+\]/;
const empty_prompt_regex = /^>\s$/;
async function runRCommand(
  cmd: string,
  rProc: ChildProcessWithoutNullStreams,
  timeout_ms = 5000
): Promise<string[]> {
  let logs = "";

  const firstLineOfCommand = cmd.split("\n")[0];
  let seenOutput = false;
  const lines: string[] = [];
  return new Promise<string[]>((resolve) => {
    rProc.stdout.on("data", (d) => {
      const output = d.toString();
      const outputLines = output.split("\n") as string[];

      // lines.push(...outputLines);

      logs += output + "\n";

      if (outputLines.some((l) => l.includes(firstLineOfCommand))) {
        seenOutput = true;
      }

      if (seenOutput) {
        // Ignore the lines with +'s in them because those are just
        // continuations of the command echo and look for output in the form of
        // square boxes around indices
        const justReturnLines = outputLines.filter((l) =>
          output_line_regex.test(l)
        );
        lines.push(...justReturnLines);
      }

      if (outputLines.some((l) => empty_prompt_regex.test(l))) {
        clearTimeout(startTimeout);
        resolve(lines);
      }
    });
    const startTimeout = setTimeout(() => {
      throw new Error(
        `Timeout, no response from run command within ${timeout_ms}ms: ${cmd}\n Logs:\n ${logs}`
      );
    }, timeout_ms);
    sendMsgToProc(cmd, rProc);
  });
}
