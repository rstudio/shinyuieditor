import type { AppInfo } from "communication-types/src/AppInfo";
import type {
  ScriptRange,
  ServerPositions,
} from "communication-types/src/MessageToBackend";

import type { CommandOutputGeneric } from "./R-Utils/runRCommand";

export type ServerInfo = {
  server_pos: {
    server_fn: ScriptRange;
    indent: number;
  };
  get_output_position: (outputId: string) => ServerPositions;
  get_input_positions: (inputId: string) => ServerPositions;
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
