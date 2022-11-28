import type { ChildProcessWithoutNullStreams } from "child_process";

import { sendMsgToProc } from "./startBackgroundRProcess";

const START_SIGNAL = "SUE_START_SIGNAL";
const END_SIGNAL = "SUE_END_SIGNAL";

export type CommandExecOptions = {
  timeout_ms?: number;
  verbose?: boolean;
};

function makeLogger(verbose: boolean, prefix: string) {
  return (msg: string) => {
    if (verbose) {
      // eslint-disable-next-line no-console
      console.log(prefix + msg);
    }
  };
}
export async function runRCommand(
  rProc: ChildProcessWithoutNullStreams,
  cmd: string,
  { timeout_ms = 1000, verbose = false }: CommandExecOptions = {}
): Promise<string[]> {
  const logger = makeLogger(verbose, "runRCommand: ");
  let logs = "";

  let seenNonEmptyOutput = false;
  let seenStartSignal = false;
  const lines: string[] = [];
  return new Promise<string[]>((resolve) => {
    function listenForOutput(d: any) {
      const outputString = d.toString();
      const outputLines = outputString.split("\n") as string[];

      logger("~~~Output chunk~~~");
      for (const l of outputLines) {
        logs += l + "\n";
        logger(l);

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
          logger("Output finished");
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
    rProc.stderr.on("data", (d) => {
      logger("stderr: " + d.toString());
    });

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
