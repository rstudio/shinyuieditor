import type { R_AST_Node } from "r-ast-parsing";
import type {
  Equal,
  Expand_Single,
  Expect,
} from "util-functions/src/TypescriptUtils";

import { get_ordered_positional_args } from "../ast_parsing/code_generation/get_ordered_positional_args";
import type { DynamicArgumentInfo } from "../components/Inputs/SettingsFormBuilder/buildStaticSettingsInfo";
import type { CustomFormRenderFn } from "../components/Inputs/SettingsFormBuilder/FormBuilder";
import type { ArgsToDynamicInfo } from "../components/Inputs/SettingsFormBuilder/inputFieldTypes";

import type { shinyActionButtonInfo } from "./ShinyActionButton";
import type {
  namedArgsObject,
  ServerBindings,
  ShinyUiNode,
  StateUpdateSubscribers,
  UiNodeComponent,
} from "./uiNodeTypes";
import type { unknownUiFunctionInfo } from "./UnknownUiFunction";

/**
 * Typescript factory function that takes as a type parameter the arguments type
 * for your node and then produces a function that will type check the info
 * object provided along with preserving some information like library and node
 * names for use in other helper types
 * @returns Function to build info for a ui node that has the arguments provided
 * by the `Args` parameter.
 */
export function nodeInfoFactory<Args extends namedArgsObject>() {
  return function makeInfo<
    ID extends string,
    TakesChildren extends boolean,
    const PyInfo extends Lang_Info<Args> | undefined,
    const RInfo extends Lang_Info<Args> | undefined,
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
     * What category does this node belong to? If left blank will default to
     * "Uncategorized"
     */
    category?: Cat;
  } & CommonInfo<Args, TakesChildren>) {
    const ordered_positional_args = get_ordered_positional_args(
      info.settingsInfo as DynamicArgumentInfo
    );
    return {
      id: id,
      ...(py_info ? { py_info } : {}),
      ...(r_info ? { r_info } : {}),
      category: category ?? "Uncategorized",
      ordered_positional_args,
      ...info,
    } as Expand_Single<
      {
        id: ID;
        py_info: undefined extends PyInfo ? never : PyInfo;
        r_info: undefined extends RInfo ? never : RInfo;
        category: Cat;
      } & Required<CommonInfo<Args, TakesChildren>> &
        ComputedInfo
    >;
  };
}

export type Lang_Info<
  Args extends namedArgsObject,
  Name extends string = string,
  Pkg extends string = string
> = {
  /**
   * Name of function as called in code: e.g. `"sliderInput"` for
   * `shiny::sliderInput()`
   */
  fn_name: Name;

  /**
   * What is the name of the package that this node resides in, if it does. If
   * left blank will default to "none"
   */
  package: Pkg;

  /**
   * Optional function to take named args object before printing and transform
   * it to some new form. E.g. adding, removing, or renaming args.
   */
  transform_named_args?: Named_Arg_Transformer<Args>;
  /**
   * Pre-process an argument to the ui node before it's converted to a ShinyUiNode type
   * @param arg_node - AST node of the argument to the node
   * @returns Processed version of the AST argument node
   */
  preprocess_raw_ast_arg?: (arg_node: R_AST_Node) => R_AST_Node;
};

// Sanity tests for types
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type testing = [
  Expect<Equal<(typeof unknownUiFunctionInfo)["category"], "Uncategorized">>,
  Expect<Equal<(typeof unknownUiFunctionInfo)["id"], "unknownUiFunction">>,
  Expect<
    Equal<(typeof unknownUiFunctionInfo)["r_info"]["package"], "Internal">
  >,
  Expect<Equal<(typeof shinyActionButtonInfo)["id"], "actionButton">>,
  Expect<
    Equal<(typeof shinyActionButtonInfo)["r_info"]["fn_name"], "actionButton">
  >,
  Expect<Equal<(typeof shinyActionButtonInfo)["category"], "Inputs">>,
  Expect<Equal<(typeof shinyActionButtonInfo)["r_info"]["package"], "shiny">>
];

/**
 * Fields in info that we compute from passed static info.
 */
type ComputedInfo = {
  /**
   * Ordered list of positional named arguments for this node in python.
   */
  ordered_positional_args: Set<string>;
};

type CommonInfo<Args extends namedArgsObject, TakesChildren extends boolean> = {
  /**
   * The name of the component in plain language. E.g. Plot Output
   */
  title: string;

  /**
   * Info declaring what arguments to render in settings panel and how
   */
  settingsInfo: ArgsToDynamicInfo<Args>;

  /**
   * Optional function to render the settings panel. If not provided then the
   * appropriate settings components will be rendered sequentially.
   */
  settingsFormRender?: CustomFormRenderFn<Args>;

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
  allowedParents?: string[];

  /**
   * Does this node have outputs code it connects to in the server side of
   * things? If so what's the argument name that links it to the server code?
   * Can also supply a function that takes the current arguments for the node
   * and returns the key. This is useful for ones where the choice may be
   * dynamic. See `GridlayoutGridCardPlot` for an example.
   */
  serverBindings?: Partial<ServerBindings<Args>>;

  /**
   * Optional update subscribers
   */
  stateUpdateSubscribers?: Partial<StateUpdateSubscribers>;

  /**
   * The component that is used to actually draw the main interface for ui
   * element
   */
  UiComponent: UiNodeComponent<Args, { TakesChildren: TakesChildren }>;

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
};

/**
 * Optional function to take named args object before printing and transform
 * it to some new form. E.g. adding, removing, or renaming args.
 * @param args - Universal Args object for ui node
 * @returns Manipulated args object. Either with args added, renamed, or
 * removed. Whatever is needed
 */
export type Named_Arg_Transformer<Args extends namedArgsObject> = (
  args: Args
) => namedArgsObject;
