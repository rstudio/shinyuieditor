import type { App_Info, App_Type } from "communication-types/src/AppInfo";
import type { Script_Range } from "communication-types/src/MessageToBackend";

import type { CommandOutputGeneric } from "./R-Utils/runRCommand";

export type ServerInfo = {
  app_type: App_Type;
  server_pos: {
    server_fn: Script_Range;
    indent: number;
  };
  get_output_position: (outputId: string) => Script_Range[];
  get_input_positions: (inputId: string) => Script_Range[];
};

export type InfoGetResults =
  | {
      ui: App_Info;
      server: ServerInfo;
    }
  | "EMPTY";

export type AppParser = {
  getInfo: () => Promise<CommandOutputGeneric<InfoGetResults>>;
  check_if_pkgs_installed: (
    pkgs: string
  ) => Promise<{ success: true } | { success: false; msg: string }>;
};
