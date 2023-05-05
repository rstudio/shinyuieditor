import type { ChildProcessWithoutNullStreams } from "child_process";

import type { StartProcessOptions } from "../startProcess";
import { startProcess } from "../startProcess";

import { get_path_to_python } from "./get_path_to_python";

export type RProcess = {
  proc: ChildProcessWithoutNullStreams;
  stop: () => boolean;
  getIsRunning: () => boolean;
};

export async function startPythonProcess(
  commands: string[],
  opts: StartProcessOptions = {}
): Promise<RProcess> {
  const pathToPython = await get_path_to_python();

  return startProcess(pathToPython, commands, opts);
}
