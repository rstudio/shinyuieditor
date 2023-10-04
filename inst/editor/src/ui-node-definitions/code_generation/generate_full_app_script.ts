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
  const { ui_tree } = info;
  return {
    app: generateUiScript({
      ui_tree,
      language: info.language,
      ...info.app,
    }),
    ...(include_info && { info }),
  };
}
