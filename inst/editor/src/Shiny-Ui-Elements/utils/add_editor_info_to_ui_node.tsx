import type { useMakeWrapperProps } from "../../components/UiNode/useMakeWrapperProps";
import type { CustomFormRenderFn } from "../../SettingsPanel/FormBuilder";
import type { UpdateAction, DeleteAction } from "../../state/app_info";
import type { NodeInfoById } from "../../ui-node-definitions";
import { node_info_by_id } from "../../ui-node-definitions";
import type { NodePath } from "../../ui-node-definitions/NodePath";
import type { ShinyUiNode } from "../../ui-node-definitions/ShinyUiNode";

export function addEditorInfoToUiNode<
  Info extends { example_args?: unknown; takesChildren: boolean }
>(
  info: Info,
  editor_info: {
    /**
     * The source of the icon. This comes from the importing of a png. If this is
     * not provided then the node will not show up in the element palette.
     */
    iconSrc?: string;
    UiComponent: UiComponentFromInfo<Info>;
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

/**
 * Add editor info to a node by id
 * @param id Id of the node as encoded by the `id` field of the node info object
 * @param editor_info Info to add to the node
 *  - `iconSrc` The source of the icon. This comes from the importing of a png. If this is
 *   not provided then the node will not show up in the element palette.
 * - `UiComponent` The component to use to render the node in the editor
 * - `settingsFormRender` The form to use to render the settings for the node
 * - `stateUpdateSubscribers` Optional update subscribers
 *
 * @returns
 */
export function addEditorInfoById<Id extends keyof NodeInfoById>(
  id: Id,
  editor_info: {
    /**
     * The source of the icon. This comes from the importing of a png. If this is
     * not provided then the node will not show up in the element palette.
     */
    iconSrc?: string;
    UiComponent: UiComponentFromInfo<NodeInfoById[Id]>;
    settingsFormRender?: CustomFormRenderFn<
      Required<NodeInfoById[Id]["example_args"]>
    >;
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
    ...node_info_by_id[id],
    ...editor_info,
  };
}

export type ArgsFromInfo<Info extends { example_args?: unknown }> =
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

export type UiComponentFromInfo<
  Info extends { example_args?: unknown; takesChildren: boolean }
> = UiNodeComponent<
  Required<Info["example_args"]>,
  { TakesChildren: Info["takesChildren"] }
>;
