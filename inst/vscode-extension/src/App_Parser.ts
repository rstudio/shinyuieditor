import type { App_Info, App_Type } from "communication-types/src/AppInfo";
import type { Script_Range } from "communication-types/src/MessageToBackend";

import type { CommandOutputGeneric } from "./R-Utils/runRCommand";

export type Server_Info = {
  app_type: App_Type;
  server_pos: Script_Range;
  get_output_position: (outputId: string) => Script_Range[];
  get_input_positions: (inputId: string) => Script_Range[];
};

export type INFO_GET_RESULTS =
  | {
      ui: App_Info;
      server: Server_Info;
    }
  | "EMPTY";

export type App_Parser = {
  getInfo: () => Promise<CommandOutputGeneric<INFO_GET_RESULTS>>;
  check_if_pkgs_installed: (
    pkgs: string
  ) => Promise<{ success: true } | { success: false; msg: string }>;
};
