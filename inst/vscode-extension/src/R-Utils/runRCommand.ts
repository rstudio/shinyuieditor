import type { ChildProcessWithoutNullStreams } from "child_process";

import { sendMsgToProc } from "./getRProcess";

const START_SIGNAL = "SUE_START_SIGNAL";
const END_SIGNAL = "SUE_END_SIGNAL";

export async function runRCommand(
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
