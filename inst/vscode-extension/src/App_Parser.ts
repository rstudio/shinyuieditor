import type { AppInfo, AppType } from "communication-types/src/AppInfo";
import type { Script_Range } from "communication-types/src/MessageToBackend";

import type { CommandOutputGeneric } from "./R-Utils/runRCommand";

export type ServerInfo = {
  app_type: AppType;
  server_pos: {
    server_fn: Script_Range;
    indent: number;
  };
  get_output_position: (outputId: string) => Script_Range[];
  get_input_positions: (inputId: string) => Script_Range[];
};

export type InfoGetResults =
  | {
      ui: AppInfo;
      server: ServerInfo;
    }
  | "EMPTY";

export type AppParser = {
  getInfo: () => Promise<CommandOutputGeneric<InfoGetResults>>;
  check_if_pkgs_installed: (
    pkgs: string
  ) => Promise<{ success: true } | { success: false; msg: string }>;
};
