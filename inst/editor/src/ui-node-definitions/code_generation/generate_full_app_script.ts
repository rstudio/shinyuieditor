import type { AppInfo } from "communication-types/src/AppInfo";

import { generateUiScript } from "./generate_ui_script";

export function generateFullAppScript(info: AppInfo): string {
  const { ui_tree } = info;
  return generateUiScript({
    ui_tree,
    language: info.language,
    ...info.app,
  });
}
