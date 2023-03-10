import type { Expect, Equal } from "util-functions/src/TypescriptUtils";

import type { CustomFormRenderFn } from "../components/Inputs/SettingsFormBuilder/FormBuilder";
import type { ArgsToDynamicInfo } from "../components/Inputs/SettingsFormBuilder/inputFieldTypes";

import type { shinyActionButtonInfo } from "./ShinyActionButton";
import type {
  ServerBindings,
  StateUpdateSubscribers,
  UiArgumentsObject,
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
export function nodeInfoFactory<Args extends UiArgumentsObject>() {
  return function makeInfo<
    Name extends string,
    Comp extends UiNodeComponent<Args, { TakesChildren: boolean }>,
    Lib extends string = "Internal",
    Cat extends string = "Uncategorized"
  >({
    name,
    library,
    category,
    ...info
  }: {
    library?: Lib;
    category?: Cat;
  } & CommonInfo<Args, Name, Comp>) {
    return {
      uiName: library ? `${library}::${name}` : name,
      name,
      library,
      category: category ?? "Uncategorized",
      ...info,
    } as InfoOut<Args, Name, Comp, Lib, Cat>;
  };
}

// Sanity tests for types
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type testing = [
  Expect<Equal<typeof unknownUiFunctionInfo["category"], "Uncategorized">>,
  Expect<Equal<typeof unknownUiFunctionInfo["uiName"], "unknownUiFunction">>,
  Expect<Equal<typeof unknownUiFunctionInfo["library"], "Internal">>,
  Expect<Equal<typeof shinyActionButtonInfo["uiName"], "shiny::actionButton">>,
  Expect<Equal<typeof shinyActionButtonInfo["category"], "Inputs">>,
  Expect<Equal<typeof shinyActionButtonInfo["library"], "shiny">>
];

type InfoOut<
  Args extends UiArgumentsObject,
  Name extends string,
  Comp extends UiNodeComponent<Args, { TakesChildren: boolean }>,
  Lib extends string,
  Cat extends string
> = {
  uiName: Lib extends "Internal" ? Name : `${Lib}::${Name}`;
  library: Lib;
  category: Cat;
} & CommonInfo<Args, Name, Comp>;

type CommonInfo<
  Args extends UiArgumentsObject,
  Name extends string,
  Comp extends UiNodeComponent<Args, { TakesChildren: boolean }>
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
};
