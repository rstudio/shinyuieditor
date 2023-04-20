import type { NodePath } from "ui-node-definitions/src/NodePath";
import type { ShinyUiNode } from "ui-node-definitions/src/uiNodeTypes";

import type { CustomFormRenderFn } from "../../components/Inputs/SettingsFormBuilder/FormBuilder";
import type { useMakeWrapperProps } from "../../components/UiNode/useMakeWrapperProps";
import type { UpdateAction, DeleteAction } from "../../state/app_info";

export function add_editor_info_to_ui_node<
  Info extends { example_args?: unknown; takesChildren: boolean }
>(
  info: Info,
  editor_info: {
    /**
     * The source of the icon. This comes from the importing of a png. If this is
     * not provided then the node will not show up in the element palette.
     */
    iconSrc?: string;
    UiComponent: UiComponent_from_info<Info>;
    settingsFormRender?: CustomFormRenderFn<Required<Info["example_args"]>>;
    /**
     * Optional update subscribers
     */
    stateUpdateSubscribers?: {
      UPDATE_NODE?: UpdateAction;
      DELETE_NODE?: DeleteAction;
    };
  }
) {
  return {
    ...info,
    ...editor_info,
  };
}

export type args_from_info<Info extends { example_args?: unknown }> =
  Info extends {
    example_args?: infer Args;
  }
    ? Args
    : never;

/**
 * Type of component defining the app view of a given ui node
 */
export type UiNodeComponent<
  NodeSettings extends object,
  Opts extends { TakesChildren: boolean }
> = (
  props: {
    namedArgs: NodeSettings;
    path: NodePath;
    wrapperProps: ReturnType<typeof useMakeWrapperProps>;
  } & (Opts["TakesChildren"] extends true
    ? { children: Array<ShinyUiNode> }
    : {})
) => JSX.Element;

export type UiComponent_from_info<
  Info extends { example_args?: unknown; takesChildren: boolean }
> = UiNodeComponent<
  Required<Info["example_args"]>,
  { TakesChildren: Info["takesChildren"] }
>;
