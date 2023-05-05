import { collapseText } from "util-functions/src/strings";

import { getPathToR } from "../R-Utils/getPathToR";

import type { App_Loc_Info, App_Startup_Info } from "./get_app_startup_info";

export async function get_r_app_startup_info({
  pathToApp,
  port,
  host,
}: App_Loc_Info): Promise<App_Startup_Info> {
  const listen_for_ready_regex = new RegExp(`listening on .+${port}`, "i");
  const pathToR = await getPathToR();
  return {
    path_to_executable: pathToR,
    startup_cmds: [
      "--no-save",
      "--no-restore",
      "--silent",
      "-e",
      collapseText(
        `options(shiny.autoreload = TRUE)`,
        `shiny::runApp(appDir = "${pathToApp}", port = ${port}, host = "${host}")`
      ),
    ],
    get_is_ready: (msg: string) => listen_for_ready_regex.test(msg),
  };
}
