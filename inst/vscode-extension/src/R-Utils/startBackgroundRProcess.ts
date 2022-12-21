import type { ChildProcessWithoutNullStreams } from "child_process";

import type { CommandExecOptions } from "./runRCommand";
import { runRCommand } from "./runRCommand";
import { startRProcess } from "./startRProcess";

export type ActiveRSession = {
  proc: ChildProcessWithoutNullStreams;
  runCmd: (
    cmd: string,
    opts?: CommandExecOptions
  ) => ReturnType<typeof runRCommand>;
  stop: () => void;
};

export async function startBackgroundRProcess(): Promise<ActiveRSession | null> {
  async function startProc() {
    return await startRProcess(
      ["--silent", "--slave", "--no-save", "--no-restore"],
      { timeout_ms: 5000 }
    );
  }
  let rProc = await startProc();

  return {
    ...rProc,
    async runCmd(cmd: string, opts?: CommandExecOptions) {
      if (!rProc.getIsRunning()) {
        // If the process crashed for some reason we need to restart it
        console.warn("Background R Process has crashed. Restarting...");
        rProc.stop();
        rProc = await startProc();
        console.warn("Background R Process restarted");
      }
      return runRCommand(rProc.proc, cmd, opts);
    },
  };
}

export function sendMsgToProc(
  msg: string,
  proc: ChildProcessWithoutNullStreams
) {
  proc.stdin.write(`${msg}\n`);
}
