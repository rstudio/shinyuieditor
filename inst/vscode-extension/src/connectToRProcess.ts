import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import process from "node:process";

const STARTUP_TIMEOUT_MS = 5000;

const STARTUP_COMMAND = `library(shinyuieditor)`;

export type ActiveRSession = {
  proc: ChildProcessWithoutNullStreams;
  runCmd: (cmd: string, timeout_ms?: number) => Promise<string[]>;
  stop: () => void;
};

const rCallargs = ["--silent", "--slave", "--no-save", "--no-restore"];

export function connectToRProcess({
  pathToR,
}: {
  pathToR: string;
}): Promise<ActiveRSession | null> {
  let logs = "";
  const running = false;

  return new Promise<ActiveRSession | null>((resolve) => {
    const controller = new AbortController();
    const { signal } = controller;
    const spawnedProcess = spawn(pathToR, rCallargs, { signal });
    spawnedProcess.pid;

    const killProcess = () => {
      // Process never started
      if (!spawnedProcess.pid) return;

      console.log("Killing backend R process", spawnedProcess.pid);
      process.kill(spawnedProcess.pid);
    };
    const runCmd = (cmd: string, timeout_ms?: number) =>
      runRCommand(cmd, spawnedProcess, timeout_ms);

    function gatherLogs(type: "error" | "out", logMsg: string) {
      logs += `${type}: ${logMsg}`;
    }

    spawnedProcess.on("spawn", () => {
      console.log("R Process is active!");
      clearTimeout(startTimeout);
      sendMsgToProc(STARTUP_COMMAND, spawnedProcess);
      resolve({
        proc: spawnedProcess,
        runCmd,
        stop: killProcess,
      });
    });

    spawnedProcess.on("error", (d) => {
      console.log("Spun up R had error", d);
    });

    spawnedProcess.stdout.on("data", (d) => {
      gatherLogs("out", d.toString());
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

const START_SIGNAL = "SUE_START_SIGNAL";
const END_SIGNAL = "SUE_END_SIGNAL";

async function runRCommand(
  cmd: string,
  rProc: ChildProcessWithoutNullStreams,
  timeout_ms = 5000
): Promise<string[]> {
  let logs = "";

  let seenNonEmptyOutput = false;
  let seenStartSignal = false;
  const lines: string[] = [];
  return new Promise<string[]>((resolve) => {
    function listenForOutput(d: any) {
      const outputLines = d.toString().split("\n") as string[];

      for (const l of outputLines) {
        logs += l + "\n";

        if (l.includes(START_SIGNAL)) {
          seenStartSignal = true;
          continue;
        }

        if (!seenStartSignal) {
          continue;
        }

        if (!seenNonEmptyOutput && l.length === 0) {
          continue;
        }

        if (l.includes(END_SIGNAL)) {
          clearTimeout(startTimeout);
          resolve(lines);
          rProc.stdout.off("data", listenForOutput);
          break;
        }

        // If we're not seeing the start signal or the end signal then we're
        // looking at the command
        seenNonEmptyOutput = true;
        lines.push(l);
      }
    }
    rProc.stdout.on("data", listenForOutput);

    const startTimeout = setTimeout(() => {
      throw new Error(
        `Timeout, no response from run command within ${timeout_ms}ms: ${cmd}\n Logs:\n ${logs}`
      );
    }, timeout_ms);

    sendMsgToProc(
      `print('${START_SIGNAL}');${cmd};print('${END_SIGNAL}')`,
      rProc
    );
  });
}

export function escapeDoubleQuotes(cmd: string): string {
  return cmd.replace(/"/g, `\\"`);
}
