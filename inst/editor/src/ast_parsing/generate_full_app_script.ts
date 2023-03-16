import type {
  Single_File_Full_Info,
  Multi_File_Full_Info,
  Single_File_App_Script,
  Multi_File_App_Script,
} from ".";

import { generate_ui_script } from "./generate_ui_script";

type Script_Generation_Options = {
  include_info: boolean;
};

export function generate_full_app_script(
  info: Single_File_Full_Info | Multi_File_Full_Info,
  { include_info }: Script_Generation_Options
): Single_File_App_Script | Multi_File_App_Script {
  const { app_type, ui_tree } = info;
  switch (app_type) {
    case "SINGLE-FILE": {
      return {
        app_type,
        app: generate_ui_script({ ui_tree, ...info.app }),
        ...(include_info && { info }),
      };
    }
    case "MULTI-FILE": {
      return {
        app_type,
        ui: generate_ui_script({ ui_tree, ...info.ui }),
        server: info.server.code,
        ...(include_info && { info }),
      };
    }
  }
}
