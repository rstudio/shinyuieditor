import type { AppInfo, AppType } from "communication-types/src/AppInfo";
import type { ScriptRange } from "communication-types/src/MessageToBackend";

import type { CommandOutputGeneric } from "./R-Utils/runRCommand";

export type ServerInfo = {
  app_type: AppType;
  server_pos: {
    server_fn: ScriptRange;
    indent: number;
  };
  get_output_position: (outputId: string) => ScriptRange[];
  get_input_positions: (inputId: string) => ScriptRange[];
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
