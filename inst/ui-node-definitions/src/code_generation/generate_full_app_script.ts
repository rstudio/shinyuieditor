import type { AppInfo, AppScriptInfo } from "communication-types/src/AppInfo";

import { generateUiScript } from "./generate_ui_script";

export function generateFullAppScript(
  info: AppInfo,
  {
    include_info,
  }: {
    include_info: boolean;
  }
): AppScriptInfo {
  const { app_type, ui_tree } = info;
  switch (app_type) {
    case "SINGLE-FILE": {
      return {
        app_type,
        app: generateUiScript({
          ui_tree,
          language: info.language,
          ...info.app,
        }),
        ...(include_info && { info }),
      };
    }
    case "MULTI-FILE": {
      return {
        app_type,
        ui: generateUiScript({ ui_tree, language: info.language, ...info.ui }),
        server: info.server.code,
        ...(include_info && { info }),
      };
    }
  }
}
