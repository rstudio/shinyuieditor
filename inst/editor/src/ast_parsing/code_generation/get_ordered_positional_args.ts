import type { DynamicArgumentInfo } from "../../components/Inputs/SettingsFormBuilder/buildStaticSettingsInfo";

export function get_ordered_positional_args(
  settingsInfo: DynamicArgumentInfo
): Set<string> {
  let positional_args: [position: number, value: string][] = [];

  for (let [name, info] of Object.entries(settingsInfo)) {
    if (
      "py_positional_index" in info &&
      typeof info.py_positional_index === "number"
    ) {
      positional_args.push([info.py_positional_index, name]);
    }
  }

  positional_args.sort(([a], [b]) => a - b);

  return new Set(positional_args.map(([_, name]) => name));
}
