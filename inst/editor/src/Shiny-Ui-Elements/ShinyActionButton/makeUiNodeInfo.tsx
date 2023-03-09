import type { CSSMeasure } from "../../components/Inputs/CSSUnitInput/CSSMeasure";
import type { CustomFormRenderFn } from "../../components/Inputs/SettingsFormBuilder/FormBuilder";
import type { ArgsToDynamicInfo } from "../../components/Inputs/SettingsFormBuilder/inputFieldTypes";
import type {
  ServerBindings,
  StateUpdateSubscribers,
  UiArgumentsObject,
  UiNodeComponent,
} from "../uiNodeTypes";

import ShinyActionButton from "./ShinyActionButton";

// function combine_values<A, B>(a:A, b:B): [A, B] {
//   return [a, b];
// }

// const infered = combine_values(4, "hi");

export function nodeInfoFactory<NodeSettings extends UiArgumentsObject>() {
  return function makeInfo<Lib extends string, Name extends string>(
    info: {
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
      settingsInfo: ArgsToDynamicInfo<NodeSettings>;

      settingsFormRender?: CustomFormRenderFn<NodeSettings>;

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
      category?: string;

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
      serverBindings?: Partial<ServerBindings<NodeSettings>>;

      /**
       * Optional update subscribers
       */
      stateUpdateSubscribers?: Partial<StateUpdateSubscribers>;
    } & (
      | {
          /**
           * Does this component accept children? This is used to enable or disable the
           * drag-to-drop callbacks.
           */
          acceptsChildren: false;
          /**
           * The component that is used to actually draw the main interface for ui
           * element
           */
          UiComponent: UiNodeComponent<NodeSettings, { TakesChildren: false }>;
        }
      | {
          /**
           * Does this component accept children? This is used to enable or disable the
           * drag-to-drop callbacks.
           */
          acceptsChildren: true;
          /**
           * The component that is used to actually draw the main interface for ui
           * element
           */
          UiComponent: UiNodeComponent<NodeSettings, { TakesChildren: true }>;
        }
    )
  ) {
    return info;
  };
}

type ShinyActionButtonProps = {
  inputId: string;
  label: string;
  width?: CSSMeasure;
};

const test = nodeInfoFactory<ShinyActionButtonProps>()({
  title: "Action Button",
  library: "shiny",
  name: "actionButton",
  acceptsChildren: false,
  UiComponent: ShinyActionButton,
  settingsInfo: {
    inputId: {
      inputType: "string",
      label: "inputId",
      defaultValue: "myButton",
    },
    label: {
      inputType: "string",
      label: "Label",
      defaultValue: "My Button",
    },
    width: {
      inputType: "cssMeasure",
      label: "Width",
      defaultValue: "100%",
      units: ["%", "px", "rem"],
      optional: true,
    },
  },
  serverBindings: {
    inputs: {
      inputIdKey: "inputId",
    },
  },
  category: "Inputs",
  description:
    "Creates an action button whose value is initially zero, and increments by one each time it is pressed.",
});

// makeUiNodeInfo<ShinyActionButtonProps>({
//   library: "shiny",
//   name: "actionButton",
//   title: "Action Button",
//   settingsInfo: makeSettingsInfo<ShinyActionButtonProps>({
//     inputId: {
//       inputType: "string",
//       label: "inputId",
//       defaultValue: "myButton",
//     },
//     label: {
//       inputType: "string",
//       label: "Label",
//       defaultValue: "My Button",
//     },
//     width: {
//       inputType: "cssMeasure",
//       label: "Width",
//       defaultValue: "100%",
//       units: ["%", "px", "rem"],
//       optional: true,
//     },
//   }),
//   serverBindings: {
//     inputs: {
//       inputIdKey: "inputId",
//     },
//   },
//   acceptsChildren: false,
//   iconSrc: buttonIcon,
//   category: "Inputs",
//   description:
//     "Creates an action button whose value is initially zero, and increments by one each time it is pressed.",
// });

// type GenericInfo<Lib extends string, Name extends string> = {
//   library?: Lib;

//   /**
//    * Name of function as called in code: e.g. `"sliderInput"` for `shiny::sliderInput()`
//    */
//   name: Name;

//   /**
//    * The name of the component in plain language. E.g. Plot Output
//    */
//   title: string;

//   /**
//    * Info declaring what arguments to render in settings panel and how
//    */
//   settingsInfo: ArgsToDynamicInfo<NodeSettings>;

//   settingsFormRender?: CustomFormRenderFn<NodeSettings>;

//   /**
//    * The source of the icon. This comes from the importing of a png. If this is
//    * not provided then the node will not show up in the element palette.
//    */
//   iconSrc?: string;

//   /**
//    * Optional category of the node. Used to organize the elements palette. All
//    * nodes with the same category will be grouped together under that categories
//    * header.
//    */
//   category?: string;

//   /**
//    * Description of the component that will show up on long hover over element
//    * in the elements pallete. String is interpreted as markdown.
//    */
//   description?: string;

//   allowedParents?: ShinyUiNames[];

//   /**
//    * Does this node have outputs code it connects to in the server side of
//    * things? If so what's the argument name that links it to the server code?
//    * Can also supply a function that takes the current arguments for the node
//    * and returns the key. This is useful for ones where the choice may be
//    * dynamic. See `GridlayoutGridCardPlot` for an example.
//    */
//   serverBindings?: Partial<ServerBindings<NodeSettings>>;

//   /**
//    * Optional update subscribers
//    */
//   stateUpdateSubscribers?: Partial<StateUpdateSubscribers>;
// } & (
//   | {
//       /**
//        * Does this component accept children? This is used to enable or disable the
//        * drag-to-drop callbacks.
//        */
//       acceptsChildren: false;
//       /**
//        * The component that is used to actually draw the main interface for ui
//        * element
//        */
//       UiComponent: UiNodeComponent<NodeSettings, { TakesChildren: false }>;
//     }
//   | {
//       /**
//        * Does this component accept children? This is used to enable or disable the
//        * drag-to-drop callbacks.
//        */
//       acceptsChildren: true;
//       /**
//        * The component that is used to actually draw the main interface for ui
//        * element
//        */
//       UiComponent: UiNodeComponent<NodeSettings, { TakesChildren: true }>;
//     }
// );
