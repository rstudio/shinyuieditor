import type {
  Equal,
  Expect,
  PickKeyFn,
} from "util-functions/src/TypescriptUtils";

import type { useMakeWrapperProps } from "../components/UiNode/useMakeWrapperProps";
import type { Primatives } from "../parsing/Primatives";
import type { Parsed_Kwarg_Node } from "../r-parsing/NodeTypes/KeywordArgNode";
import type { CustomFormRenderFn } from "../SettingsPanel/FormBuilder";
import type { UpdateAction, DeleteAction } from "../state/app_info";

import type { ArgsToDynamicInfo } from "./inputFieldTypes";
import type { NodePath } from "./NodePath";
import type { input_action_button } from "./Shiny/ShinyActionButton/input_action_button";
import type { ShinyUiNode } from "./ShinyUiNode";
import type { NamedArgsObject } from "./uiNodeTypes";
import type {
  DynamicArgumentInfo,
  OnlyStaticSettingsInfo,
} from "./utils/buildStaticSettingsInfo";
import { getOrderedPositionalArgs } from "./utils/get_ordered_positional_args";

/**
 * Info on server binding for a node. This is used for checking for server
 * bindings
 * @param argName - Name of the argument that links to the server code
 * @param argType - Is this an input or output argument
 */
type ServerBindingInfo = {
  argName: string;
  argType: "input" | "output";
};

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

// Add a new link to factory pattern from typescript course
/**
 * Typescript factory function that takes as a type parameter the arguments type
 * for your node and then produces a function that will type check the info
 * object provided along with preserving some information like library and node
 * names for use in other helper types
 * @returns Function to build info for a ui node that has the arguments provided
 * by the `Args` parameter.
 */
export function nodeInfoFactory<Args extends NamedArgsObject>() {
  return function makeInfo<
    ID extends string,
    TakesChildren extends boolean,
    const PyInfo extends LangInfo<Args> | undefined,
    const RInfo extends LangInfo<Args> | undefined,
    Cat extends string = "Uncategorized"
  >({
    id,
    py_info,
    r_info,
    category,
    ...info
  }: {
    /**
     * Unique identifier for this node. Should not overlap with other nodes.
     * Typically this is the function name but for functions with different names
     * between r and python it may be something different
     */
    id?: ID;

    py_info?: PyInfo;
    r_info?: RInfo;

    /**
     * The source of the icon. This comes from the importing of a png. If this is
     * not provided then the node will not show up in the element palette.
     */
    iconSrc?: string;

    ui_component: UiNodeComponent<Args, { TakesChildren: TakesChildren }>;
    settingsFormRender?: CustomFormRenderFn<Args>;

    /**
     * Optional update subscribers
     */
    stateUpdateSubscribers?: {
      UPDATE_NODE?: UpdateAction;
      DELETE_NODE?: DeleteAction;
    };

    /**
     * What category does this node belong to? If left blank will default to
     * "Uncategorized"
     */
    category?: Cat;
  } & CommonInfo<Args, TakesChildren>) {
    const ordered_positional_args = getOrderedPositionalArgs(
      info.settingsInfo as DynamicArgumentInfo
    );

    let serverBindingInfo: null | ServerBindingInfo = null;
    for (const [argName, argInfo] of Object.entries(info.settingsInfo)) {
      if (argInfo.inputType === "id") {
        serverBindingInfo = { argName, argType: argInfo.inputOrOutput };
        break;
      }
    }

    const py_arg_name_to_sue_arg_name = new Map<string, string>();
    for (const [arg_name, arg_info] of Object.entries(info.settingsInfo)) {
      if (arg_info.py_name) {
        py_arg_name_to_sue_arg_name.set(arg_info.py_name, arg_name);
      }
    }

    const r_arg_name_to_sue_arg_name = new Map<string, string>();
    for (const [arg_name, arg_info] of Object.entries(info.settingsInfo)) {
      if (arg_info.r_name) {
        r_arg_name_to_sue_arg_name.set(arg_info.r_name, arg_name);
      }
    }

    const required_arg_names = Object.entries(info.settingsInfo)
      .filter(([_, arg_info]) => !arg_info.optional)
      .map(([arg_name, _]) => arg_name);

    const get_arg_info: StaticArgInfoGetter = (arg_name) => {
      if (arg_name in info.settingsInfo) {
        return info.settingsInfo[
          arg_name as keyof typeof info.settingsInfo
        ] as OnlyStaticSettingsInfo;
      } else {
        return null;
      }
    };

    return {
      id: id,
      ...(py_info ? { py_info } : {}),
      ...(r_info ? { r_info } : {}),
      category: category ?? "Uncategorized",
      ordered_positional_args,
      py_arg_name_to_sue_arg_name,
      r_arg_name_to_sue_arg_name,
      required_arg_names,
      get_arg_info,
      serverBindingInfo,
      ...info,
    } as {
      id: ID;
      py_info: undefined extends PyInfo ? never : PyInfo;
      r_info: undefined extends RInfo ? never : RInfo;
      category: Cat;
      ui_component?: UiNodeComponent<Args, { TakesChildren: TakesChildren }>;
      settingsFormRender?: CustomFormRenderFn<Args>;
      stateUpdateSubscribers?: {
        UPDATE_NODE?: UpdateAction;
        DELETE_NODE?: DeleteAction;
      };
    } & Required<CommonInfo<Args, TakesChildren>> &
      ComputedInfo;
  };
}

export type LangInfo<
  Args extends NamedArgsObject,
  Name extends string = string,
  Pkg extends string = string
> = {
  /**
   * Name of function as called in code: e.g. `"sliderInput"` for
   * `shiny::sliderInput()`
   */
  fn_name: Name;

  /**
   * Other names that should map to this same node. This is used for things like
   * backward compatibility when an api updates
   */
  fn_aliases?: {
    /**
     * Name of other function
     */
    fn_name: string;

    /**
     * New package name for function. Defaults to the same package as the
     * original function
     */
    package?: string;
    /**
     * Optional function to remap the arguments from this function to the root
     * functions argument format
     */
    argument_remapping?: NamedArgTransformer<Args>;
  }[];

  /**
   * What is the name of the package that this node resides in, if it does. If
   * left blank will default to "none"
   */
  package: Pkg;

  /**
   * Optional function to take named args object before printing and transform
   * it to some new form. E.g. adding, removing, or renaming args.
   */
  transform_named_args?: NamedArgTransformer<Args>;

  /**
   * Pre-process an argument to the ui node before it's converted to a
   * ShinyUiNode type
   * @param arg_node - AST node of the argument to the node
   * @returns Processed version of the AST argument node or `null` if the node
   * should be processed as is
   */
  preprocess_raw_ast_arg?: (
    kwarg_node: Parsed_Kwarg_Node
  ) => PreprocessedArgNode | null;

  /**
   * Does this node have outputs code it connects to in the server side of
   * things? If so what's the argument name that links it to the server code?
   * Can also supply a function that takes the current arguments for the node
   * and returns the key. This is useful for ones where the choice may be
   * dynamic. See `GridlayoutGridCardPlot` for an example.
   */
  output_bindings?: OutputBindings<Args>;

  input_bindings?: InputBindings<Args>;
};

/**
 * Represents a node that has been preprocessed from the TreeSitter AST.
 */
export type PreprocessedArgNode = {
  name: string;
  value: Primatives;
};

/**
 * Lookup info for a given argument name
 * @param arg_name Name of argument to look up
 * @returns Info for that argument in the settings info, or null if it isn't found
 */
type StaticArgInfoGetter = (arg_name: string) => OnlyStaticSettingsInfo | null;

// Sanity tests for types
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Testing = [
  Expect<Equal<(typeof input_action_button)["id"], "actionButton">>,
  Expect<
    Equal<(typeof input_action_button)["r_info"]["fn_name"], "actionButton">
  >,
  Expect<Equal<(typeof input_action_button)["category"], "Inputs">>,
  Expect<Equal<(typeof input_action_button)["r_info"]["package"], "shiny">>
];

/**
 * Fields in info that we compute from passed static info.
 */
type ComputedInfo = {
  /**
   * Ordered list of positional named arguments for this node in python.
   */
  ordered_positional_args: Set<string>;

  /**
   * Map from python argument name to shiny-ui-editor argument name for common
   * situations like inputId => id in python
   */
  py_arg_name_to_sue_arg_name: Map<string, string>;

  /**
   * Map from R argument name to shiny-ui-editor argument name
   */
  r_arg_name_to_sue_arg_name: Map<string, string>;

  /**
   * Lookup info for a given argument name
   */
  get_arg_info: StaticArgInfoGetter;

  /**
   * Array of names for required arguments. Used to check to make sure the full
   * set of arguments is provided when parsing
   */
  required_arg_names: string[];
};

type CommonInfo<Args extends NamedArgsObject, TakesChildren extends boolean> = {
  /**
   * The name of the component in plain language. E.g. Plot Output
   */
  title: string;

  /**
   * Info declaring what arguments to render in settings panel and how
   */
  settingsInfo: ArgsToDynamicInfo<Args>;

  /**
   * The source of the icon. This comes from the importing of a png. If this is
   * not provided then the node will not show up in the element palette.
   */
  iconSrc?: string;

  /**
   * Description of the component that will show up on long hover over element
   * in the elements pallete. String is interpreted as markdown.
   */
  description?: string;

  /**
   * List of names of allowed parent nodes. This should typically be set to
   * `satisfies ShinyUiNodeNames[]` to ensure that the names are valid.
   */
  readonly allowedParents?: string[];

  /**
   * Does this node have outputs code it connects to in the server side of
   * things? If so what's the argument name that links it to the server code?
   * Can also supply a function that takes the current arguments for the node
   * and returns the key. This is useful for ones where the choice may be
   * dynamic. See `GridlayoutGridCardPlot` for an example.
   */
  // serverBindings?: Partial<ServerBindings<Args>>;

  /**
   * Does this node take children? Aka is it a parent node?
   */
  takesChildren: TakesChildren;

  /**
   * Optional way of defining what the default value for a node is. This will be
   * used when a node is dragged from the elements palette. Can be useful for
   * filling in various settings with typically desired presets or adding
   * children. If this is not defined the node is generated using the arguments
   * info and defined default values
   */
  default_node?: { namedArgs: Args } & (TakesChildren extends true
    ? { children: Array<ShinyUiNode> }
    : {});

  /**
   * Optional example for args. Primarily used so we can extrac the types from
   * the info objects and provide autocomplete later. Not used at runtime ever
   */
  example_args?: Args;

  /**
   * Info about if there is a server binding for this node. Will be non null if
   * node is an input or output node.
   */
  serverBindingInfo?: null | ServerBindingInfo;
};

/**
 * Optional function to take named args object before printing and transform
 * it to some new form. E.g. adding, removing, or renaming args.
 * @param args - Universal Args object for ui node
 * @returns Manipulated args object. Either with args added, renamed, or
 * removed. Whatever is needed
 */
type NamedArgTransformer<Args extends NamedArgsObject> = (
  args: Args
) => NamedArgsObject;

export type OutputBindings<
  NodeSettings extends NamedArgsObject = NamedArgsObject
> = {
  /**
   * Name of the argument (in the language-agnostic arguments type) for the node
   * that links it to the server output chunk. If omitted defaults to
   * `outputId`.
   */
  outputIdKey?: keyof NodeSettings | PickKeyFn<NodeSettings>;
  /** Scaffold text to be inserted into the app server if the user requests.
   * Can use the [vscode snippet
   * syntax](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_create-your-own-snippets).
   * */
  renderScaffold: OutputBindingScaffold;
};

/**
 * Object containing info needed to generate an output binding for the server
 * code of an app
 */
export type OutputBindingScaffold = {
  /**
   * Name of the function to be called in the server code to render the output
   */
  fn_name: string;
  /**
   * Body of the function to be called in the server code to render the output.
   */
  fn_body: string;
};

export type InputBindings<
  NodeSettings extends NamedArgsObject = NamedArgsObject
> = boolean | keyof NodeSettings | PickKeyFn<NodeSettings>;
