import type { CustomFormRenderFn } from "../components/Inputs/SettingsFormBuilder/FormBuilder";
import type { ArgsToDynamicInfo } from "../components/Inputs/SettingsFormBuilder/inputFieldTypes";

import type {
  ServerBindings,
  StateUpdateSubscribers,
  UiArgumentsObject,
  UiNodeComponent,
} from "./uiNodeTypes";

function makeFullName<TLib extends string, TName extends string>({
  library,
  name,
}: {
  library: TLib;
  name: TName;
}): `${TLib}::${TName}` {
  return `${library}::${name}`;
}

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
    Lib extends string,
    Name extends string,
    Cat extends string,
    Comp extends UiNodeComponent<Args, { TakesChildren: boolean }>
  >({ category: provided_cat, ...info }: InfoType<Args, Lib, Name, Comp, Cat>) {
    return {
      uiName: makeFullName(info),
      category: provided_cat ?? ("uncategorized" as const),
      ...info,
    };
  };
}

type InfoType<
  Args extends UiArgumentsObject,
  Lib extends string,
  Name extends string,
  Comp extends UiNodeComponent<Args, { TakesChildren: boolean }>,
  Cat extends string | "uncategorized" = "uncategorized"
> = Comp extends UiNodeComponent<
  Args,
  { TakesChildren: infer TChildren extends boolean }
>
  ? {
      library: Lib;

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
       * Optional category of the node. Used to organize the elements palette. All
       * nodes with the same category will be grouped together under that categories
       * header.
       */
      category?: Cat;

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

      takesChildren?: TChildren;
    }
  : never;
