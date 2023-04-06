import type { R_AST_Node } from "r-ast-parsing";
import type { Expect, Equal } from "util-functions/src/TypescriptUtils";

import type { CustomFormRenderFn } from "../components/Inputs/SettingsFormBuilder/FormBuilder";
import type { ArgsToDynamicInfo } from "../components/Inputs/SettingsFormBuilder/inputFieldTypes";

import type { shinyActionButtonInfo } from "./ShinyActionButton";
import type {
  ServerBindings,
  ShinyUiNode,
  StateUpdateSubscribers,
  namedArgsObject,
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
    Name extends string,
    TakesChildren extends boolean,
    Comp extends UiNodeComponent<Args, { TakesChildren: TakesChildren }>,
    RPackage extends string,
    PyPackage extends string = "none",
    Cat extends string = "Uncategorized"
  >({
    name,
    r_package,
    py_package,
    category,
    ...info
  }: {
    r_package: RPackage;
    py_package?: PyPackage;
    category?: Cat;
  } & CommonInfo<Args, Name, Comp, TakesChildren>) {
    return {
      id: name,
      name,
      r_package,
      py_package: py_package ?? "none",
      category: category ?? "Uncategorized",
      ...info,
    } as {
      id: Name;
      r_package: RPackage;
      py_package: undefined extends PyPackage ? "none" : PyPackage;
      category: Cat;
    } & CommonInfo<Args, Name, Comp, TakesChildren>;
  };
}

// Sanity tests for types
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type testing = [
  Expect<Equal<typeof unknownUiFunctionInfo["category"], "Uncategorized">>,
  Expect<Equal<typeof unknownUiFunctionInfo["id"], "unknownUiFunction">>,
  Expect<Equal<typeof unknownUiFunctionInfo["r_package"], "Internal">>,
  Expect<Equal<typeof shinyActionButtonInfo["id"], "actionButton">>,
  Expect<Equal<typeof shinyActionButtonInfo["category"], "Inputs">>,
  Expect<Equal<typeof shinyActionButtonInfo["r_package"], "shiny">>
];

type CommonInfo<
  Args extends namedArgsObject,
  Name extends string,
  Comp extends UiNodeComponent<Args, { TakesChildren: boolean }>,
  TakesChildren extends boolean
> = {
  /**
   * Name of function as called in code: e.g. `"sliderInput"` for `shiny::sliderInput()`
   */
  name: Name;

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
     * Optional function to process the named arguments of the node. Useful for
     * when the simple args object -> key-value option isn't enough. E.g.
     * collapsing multiple args into a single one or or converting to code output
     * etc..
     */
    print_named_args?: ProcessNamedArgs<Args>;

    /**
     * Pre-process an argument to the ui node before it's converted to a ShinyUiNode type
     * @param arg_node - AST node of the argument to the node
     * @returns Processed version of the AST argument node
     */
    preprocess_raw_ast_arg?: (arg_node: R_AST_Node) => R_AST_Node;
  };
};

/**
 * Generates rendered code for the named arguments of code. This is useful for
 * functions where processesing of the arguments may need to be done. Like
 * converting a keyword for a function call etc.. If this function is procided
 * it is used in-lieu of the default printing of arguments.
 * @param args - Arguments for the node being rendered
 * @param render_child - Function to render a child node to be used to render
 * ui node type arguments if neccesary
 * @returns Array of strings that will be joined with `","` to form the named
 * arguments in the generated R code
 */
export type ProcessNamedArgs<Args extends namedArgsObject> = (
  args: Args,
  render_child: (child: ShinyUiNode) => string
) => string[];
