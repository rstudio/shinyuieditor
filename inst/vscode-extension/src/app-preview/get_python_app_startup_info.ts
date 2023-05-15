import { get_path_to_python } from "../Python-Utils/get_path_to_python";

import type { App_Loc_Info, App_Startup_Info } from "./get_app_startup_info";

export async function get_python_app_startup_info({
  pathToApp,
  port,
  host,
}: App_Loc_Info): Promise<App_Startup_Info> {
  const listen_for_ready_regex = new RegExp(
    `application startup complete.`,
    "i"
  );

  return {
    path_to_executable: await get_path_to_python(),
    startup_cmds: [
      `-m`,
      `shiny`,
      `run`,
      `--port`,
      `${port}`,
      `--host`,
      host,
      `--reload`,
      pathToApp.replace(/([\\"])/g, "\\$1"),
    ],
    get_is_ready: (msg: string) => listen_for_ready_regex.test(msg),
  };
}

//  venv/bin/python -m shiny run --port 3333 --host 0.0.0.0 --reload "./scratch/python"
