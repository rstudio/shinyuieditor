import type { ChildProcessWithoutNullStreams } from "child_process";
import { spawn } from "child_process";
import process from "node:process";

import { runRCommand } from "./runRCommand";
import { getRpath } from "./setupRConnection";

const STARTUP_TIMEOUT_MS = 5000;

const STARTUP_COMMAND = `library(shinyuieditor)`;

export type ActiveRSession = {
  proc: ChildProcessWithoutNullStreams;
  runCmd: (cmd: string, timeout_ms?: number) => Promise<string[]>;
  stop: () => void;
};

const rCallargs = ["--silent", "--slave", "--no-save", "--no-restore"];

function connectToRProcess({
  pathToR,
}: {
  pathToR: string;
}): Promise<ActiveRSession | null> {
  let logs = "";

  return new Promise<ActiveRSession | null>((resolve) => {
    const controller = new AbortController();
    const { signal } = controller;
    const spawnedProcess = spawn(pathToR, rCallargs, { signal });
    // spawnedProcess.pid;

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

export async function getRProcess(): Promise<ActiveRSession> {
  const rPath = await getRpath();
  if (rPath === undefined) {
    throw new Error("Can't get R path");
  }
  const RProc = await connectToRProcess({ pathToR: rPath });

  if (RProc === null) {
    throw new Error("R process failed to start :(");
  }

  return RProc;
}

export function sendMsgToProc(
  msg: string,
  proc: ChildProcessWithoutNullStreams
) {
  proc.stdin.write(`${msg}\n`);
}
