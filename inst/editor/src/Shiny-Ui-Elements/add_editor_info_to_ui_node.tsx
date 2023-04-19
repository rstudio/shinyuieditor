import type { CustomFormRenderFn } from "../components/Inputs/SettingsFormBuilder/FormBuilder";

import type { UiNodeComponent } from "./uiNodeTypes";

export function add_editor_info_to_ui_node<
  Info extends { example_args?: unknown; takesChildren: boolean }
>(
  info: Info,
  {
    iconSrc,
    component: UiComponent,
  }: {
    /**
     * The source of the icon. This comes from the importing of a png. If this is
     * not provided then the node will not show up in the element palette.
     */
    iconSrc?: string;
    component: UiComponent_from_info<Info>;
    settingsFormRender?: CustomFormRenderFn<Required<Info["example_args"]>>;
  }
) {
  return {
    ...info,
    UiComponent,
    iconSrc,
  };
}

type args_from_info<Info extends { example_args?: unknown }> = Info extends {
  example_args?: infer Args;
}
  ? Args
  : never;

type takes_child_from_info<Info extends { takesChildren: boolean }> =
  Info extends { takesChildren: infer T } ? T : never;

export type UiComponent_from_info<
  Info extends { example_args?: unknown; takesChildren: boolean }
> = UiNodeComponent<
  Required<Info["example_args"]>,
  { TakesChildren: Info["takesChildren"] }
>;
