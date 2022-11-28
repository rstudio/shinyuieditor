import type { ChildProcessWithoutNullStreams } from "child_process";

import type { CommandExecOptions } from "./runRCommand";
import { runRCommand } from "./runRCommand";
import { startRProcess } from "./startRProcess";

export type ActiveRSession = {
  proc: ChildProcessWithoutNullStreams;
  runCmd: (cmd: string, opts?: CommandExecOptions) => Promise<string[]>;
  stop: () => void;
};

export async function startBackgroundRProcess(): Promise<ActiveRSession | null> {
  const rProc = await startRProcess(
    ["--silent", "--slave", "--no-save", "--no-restore"],
    { timeout_ms: 5000 }
  );

  return {
    ...rProc,
    runCmd: (cmd: string, opts?: CommandExecOptions) =>
      runRCommand(rProc.proc, cmd, opts),
  };
}

export function sendMsgToProc(
  msg: string,
  proc: ChildProcessWithoutNullStreams
) {
  proc.stdin.write(`${msg}\n`);
}
