import type { R_AST_Node } from "r-ast-parsing";
import type {
  Equal,
  Expand_Single,
  Expect,
} from "util-functions/src/TypescriptUtils";

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
    RFnName extends string,
    TakesChildren extends boolean,
    Comp extends UiNodeComponent<Args, { TakesChildren: TakesChildren }>,
    RPackage extends string = "none",
    ID extends string = RFnName,
    PyPackage extends string = "none",
    PyFnName extends string = "none",
    Cat extends string = "Uncategorized"
  >({
    id,
    r_fn_name,
    r_package,
    py_fn_name,
    py_package,
    category,
    ...info
  }: CommonInfo<
    Args,
    ID,
    Cat,
    RFnName,
    RPackage,
    PyFnName,
    PyPackage,
    TakesChildren,
    Comp
  >) {
    return {
      id: id ?? r_fn_name,
      r_fn_name,
      r_package: r_package ?? "none",
      py_fn_name: py_fn_name ?? "none",
      py_package: py_package ?? "none",
      category: category ?? "Uncategorized",
      ...info,
    } as Expand_Single<
      Required<
        CommonInfo<
          Args,
          ID,
          Cat,
          RFnName,
          RPackage,
          PyFnName,
          PyPackage,
          TakesChildren,
          Comp
        >
      >
    >;
  };
}

// Sanity tests for types
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type testing = [
  Expect<Equal<typeof unknownUiFunctionInfo["category"], "Uncategorized">>,
  Expect<Equal<typeof unknownUiFunctionInfo["id"], "unknownUiFunction">>,
  Expect<Equal<typeof unknownUiFunctionInfo["r_package"], "Internal">>,
  Expect<Equal<typeof shinyActionButtonInfo["id"], "actionButton">>,
  Expect<Equal<typeof shinyActionButtonInfo["r_fn_name"], "actionButton">>,
  Expect<Equal<typeof shinyActionButtonInfo["category"], "Inputs">>,
  Expect<Equal<typeof shinyActionButtonInfo["r_package"], "shiny">>
];

type CommonInfo<
  Args extends namedArgsObject,
  ID extends string,
  Cat extends string,
  RFnName extends string,
  RPackage extends string,
  PyFnName extends string,
  PyPackage extends string,
  TakesChildren extends boolean,
  Comp extends UiNodeComponent<Args, { TakesChildren: TakesChildren }>
> = {
  /**
   * Unique identifier for this node. Should not overlap with other nodes.
   * Typically this is the function name but for functions with different names
   * between r and python it may be something different
   */
  id?: ID;

  /**
   * Name of function as called in R code: e.g. `"sliderInput"` for
   * `shiny::sliderInput()`
   */
  r_fn_name: RFnName;

  /**
   * What is the name of the R package that this node resides in, if it does. If
   * left blank will default to "none"
   */
  r_package?: RPackage;

  /**
   * Name of function as called in Python code: e.g. `"ui.input_slider"`
   */
  py_fn_name?: PyFnName;

  /**
   * What's the name of the R package that this node resides in? If left blank will default to "none"
   */
  py_package?: PyPackage;

  /**
   * What category does this node belong to? If left blank will default to
   * "Uncategorized"
   */
  category?: Cat;

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
  UiComponent: Comp;

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
   * Optional functions to process the arguments of the node when coming from or
   * going to R code
   */
  code_gen_R?: {
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

  code_gen_py?: {
    /**
     * Optional function to take named args object before printing and transform
     * it to some new form. E.g. adding, removing, or renaming args.
     */
    transform_named_args?: Named_Arg_Transformer<Args>;
  };
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
