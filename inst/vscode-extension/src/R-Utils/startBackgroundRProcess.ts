import type { ChildProcessWithoutNullStreams } from "child_process";

import { startProcess } from "../startProcess";

import { getPathToR } from "./getPathToR";
import type { CommandExecOptions } from "./runRCommand";
import { runRCommand } from "./runRCommand";

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
    return await startProcess(
      await getPathToR(),
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
        // eslint-disable-next-line no-console
        console.warn("Background R Process has crashed. Restarting...");
        rProc.stop();
        rProc = await startProc();
        // eslint-disable-next-line no-console
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
