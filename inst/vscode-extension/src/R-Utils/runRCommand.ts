import type { ChildProcessWithoutNullStreams } from "child_process";

import { sendMsgToProc } from "./startBackgroundRProcess";

const START_SIGNAL = "SUE_START_SIGNAL";
const END_SIGNAL = "SUE_END_SIGNAL";

export type CommandExecOptions = {
  timeout_ms?: number;
  verbose?: boolean;
};

export type CommandOutputGeneric<T extends any> =
  | { status: "success"; values: T }
  | { status: "error"; errorMsg: string };

export type CommandOutput = CommandOutputGeneric<string[]>;

export async function runRCommand(
  rProc: ChildProcessWithoutNullStreams,
  cmd: string,
  { timeout_ms = 1000, verbose = false }: CommandExecOptions = {}
): Promise<CommandOutput> {
  const logger = (msg: string) => {
    if (verbose) {
      // eslint-disable-next-line no-console
      console.log(`runRCommand: ${msg}`);
    }
  };
  let logs = "";

  let seenStartSignal = false;
  const lines: string[] = [];

  if (rProc.exitCode !== null) {
    return {
      status: "error",
      errorMsg: `Can't run R command as background R process has exited with code ${rProc.exitCode}.`,
    };
  }

  return new Promise<CommandOutput>((resolve) => {
    function listenForOutput(d: any) {
      const outputString = d.toString();
      const outputLines = outputString.split("\n") as string[];

      logger("~~~Output chunk~~~");
      for (const l of outputLines) {
        const isStartSignal = l.includes(START_SIGNAL);
        const isEndSignal = l.includes(END_SIGNAL);
        const emptyLine = l.length === 0;

        if (isStartSignal) {
          seenStartSignal = true;
          continue;
        }

        if (isEndSignal) {
          clearTimeout(startTimeout);
          resolve({ status: "success", values: lines });
          logger("Output finished");
          cleanup();
          break;
        }

        if (!seenStartSignal || emptyLine) {
          continue;
        }

        // If we're not seeing the start signal or the end signal then we're
        // looking at the command
        logger(l);
        logs += l + "\n";

        lines.push(l);
      }
    }

    function listenForStderrOutput(d: any) {
      const msg = d.toString();
      logs += `stderr: ${msg}\n`;
      logger("stderr: " + msg);
    }

    function listenForClose() {
      resolve({
        status: "error",
        errorMsg: logs,
      });
      cleanup();
    }

    rProc.stdout.on("data", listenForOutput);
    rProc.stderr.on("data", listenForStderrOutput);
    rProc.on("close", listenForClose);

    const startTimeout = setTimeout(() => {
      resolve({
        status: "error",
        errorMsg: `Timeout, no response from run command within ${timeout_ms}ms: ${cmd}\n Logs:\n ${logs}`,
      });
      cleanup();
    }, timeout_ms);

    function cleanup() {
      rProc.stdout.off("data", listenForOutput);
      rProc.stderr.off("data", listenForStderrOutput);
      rProc.off("close", listenForClose);
    }
    sendMsgToProc(
      `print('${START_SIGNAL}');${cmd};print('${END_SIGNAL}')`,
      rProc
    );
  });
}
