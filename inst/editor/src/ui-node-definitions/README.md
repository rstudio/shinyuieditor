## Node Definitions

This directory contains the node definitions for the editor. These define what nodes are available in the editor: what arguments they take, how they should be rendered, and other metadata.

A node definition is written as a large psuedo-JSON object.

### Registering node

### Example node definition

The following is the complete definition for the action button. It contains all the information needed to add the action button to the ui editor. Comments have been added to explain the different parts of the definition.

```ts
// Icons are stored as pngs.
import buttonIcon from "../../../assets/icons/shinyButton.png";

// There are various helper components in the components/ directory. Here we use the Button component.
import Button from "../../../components/Inputs/Button/Button";

// There are also various helper types. A very common one is the `CSSMeasure` type, which is used to specify a css measurement.
import type { CSSMeasure } from "../../inputFieldTypes";

// We define the node definition using the nodeInfoFactory function. This uses a typescript builder pattern to define the node. In this case the outer function only exists to capture the generic type of the node's arguments. This type is then used internally to give type safety to the node definition.
import { nodeInfoFactory } from "../../nodeInfoFactory";

// The button has three arguments. We define them as a typescript type here. Note width is optional and uses the cssMeasure type.
export const input_action_button = nodeInfoFactory<{
  inputId: string;
  label: string;
  width?: CSSMeasure;
}>()({
  // All fields have documentation which is accessible via intelisense. This is the title of the node.
  title: "Action Button",

  // The ID is used to identify the node in a the internal AST-like ui tree structure. It must be unique. Many are simple the same name as the R function due to historical reasons. This is not required.
  id: "actionButton",

  // the r_info and py_info fields control language specific information about the node. If one is left out then the node is not available when the editor is in that language mode. Action Button is available in both R and Python and so both are defined.
  r_info: {
    // In R the action button function is just "actionButton"
    fn_name: "actionButton",
    package: "shiny",
    // By setting input_bindings to true, we are telling the editor that it should look for input bindings for this node in the server code when it is selected.
    input_bindings: true,
  },
  py_info: {
    // In Python the action button has a more verbose name and resides in the `ui` submodule.
    fn_name: "ui.input_action_button",
    package: "shiny",
    input_bindings: true,
  },

  // Is the node a container or a leaf node?
  takesChildren: false,

  // The category is used to group nodes in the elements palette.
  category: "Inputs",

  // The description is used in the node's tooltip when moused over in the elements palette.
  description:
    "Creates an action button whose value is initially zero, and increments by one each time it is pressed.",

  // The iconSrc is the path to the icon for the node. This is used in the elements palette. If this is not included the element will not show up in the palette. It will, however, still be available for use in the editor. This is useful for nodes that are used to wrap other nodes (like card headers and footers).
  iconSrc: buttonIcon,

  // The settingsInfo object defines how the node's settings panel looks for editing. Type checking insures that the `inputType` field matches the type of the argument in the node's type definition. Each input type has unique extra properties. These are innumerated below.
  settingsInfo: {
    inputId: {
      inputType: "id",
      inputOrOutput: "input",
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

  // The ui_component field defines how the node is rendered in the editor. The props provided are the node's arguments and the wrapperProps. The wrapperProps are used to pass props to the wrapper div that contains the node. This is needed for things like drag and drop and hover effects.
  ui_component: ({
    namedArgs: { label = "My Action Button", width },
    wrapperProps,
  }) => {
    return (
      <div
        className="grid place-content-center grid-cols-1 grid-rows-1 p-1 max-h-full"
        {...wrapperProps}
      >
        <Button style={width ? { width } : undefined}>{label}</Button>
      </div>
    );
  },
});
```

**Optional settingsformRender property**

If more custom behavior is needed for a given node's settings panel display. A `settingsFormRender` function can be provided. Here's the type definition for this function:

```ts
// inst/editor/src/SettingsPanel/FormBuilder.tsx
/**
 * A function that can be used to render a custom form for a node.
 */
export type CustomFormRenderFn<Settings extends SettingsObj> = (x: {
  /**
   * A map keyed by the name of an argument with values that are react elements rendering the appropriate settings input for adjusting that argument.
   */
  inputs: Record<StringKeys<Settings>, JSX.Element>;
  /**
   * The current values of the settings/ arugments for a node
   */
  settings: Settings;

  /**
   * Callback that can be used to update an argument's value if more complex
   * logic is needed than is provided in the component provided by the arguments `inputs` component.
   * @param name Name of the argument to update
   * @param action How to update the argument. Is an object with either `type: "UPDATE"` or `type: "REMOVE"` and a `value` property if the type is `UPDATE`
   * @returns void
   */
  onSettingsChange?: (name: string, action: SettingsUpdateAction) => void;
}) => JSX.Element;
```

### Available input types

In the rendering of a node's settings panel there are a series of predefined input types that are chosen via the `inputType` field. The options are as follows:

- "id": A special input type for ids. It enforces that the id is unique and has no spaces or special characters.
- "string": A string input. The `longform` field can be set to true to allow for multiline strings.
- "number": A simple number input.
- "cssMeasure": A css measurement input. The `units` field can be used to specify which units are allowed.
- "boolean": A simple checkbox.
- "list": A list of key value string pairs or simple array of strings. The `newItemValue` field can be used to specify a default value for new items. It can be a static value or a function that takes the index of the new item and returns a value for things like making the new element unique or responsive to the index.
- "dropdown": A dropdown menu. The `choices` field is an array of strings that are the options for the dropdown.
- "radio": A radio button group. The `choices` field is an object where the keys are the values and the values are objects with an icon and label or just a label.
- "ui-node": This is for the case where a full ui element/node is provided as an argument. There is no settings panel for this type but is needed for the editor to know that it should traverse into the named arguments and not just the children of a node.

```ts
// inputFieldTypes.ts
export type InputOptions =
  // Special ID input. Like a string input but enforces things like no spaces or
  // special characters. Also checks to make sure ids are unique etc.
  | { inputType: "id"; value: string; inputOrOutput?: "input" | "output" }
  | { inputType: "string"; value: string; longform?: boolean }
  | {
      inputType: "number";
      value: number;
      // Currently not used at all
      min?: number;
      max?: number;
    }
  | { inputType: "cssMeasure"; value: CSSMeasure; units?: CSSUnitWAuto[] }
  | { inputType: "boolean"; value: boolean }
  | {
      inputType: "list";
      /**
       * Lists can have key value mode or just plain value mode.
       */
      value: Record<string, string> | Array<string>;
      newItemValue?:
        | { key: string; value: string }
        | ((i: number) => { key: string; value: string });
    }
  | { inputType: "dropdown"; value: string; choices: string[] }
  | {
      inputType: "radio";
      value: string;
      choices: Record<
        string,
        { icon: JSX.Element | string; label?: string } | { label: string }
      >;
      optionsPerColumn?: number;
    }
  | {
      inputType: "ui-node";
      value: ShinyUiNode;
    };
```

## Registering node

Once the node information is defined. The return result of `nodeInfoFactory` should be imported into the file `uiNodeTypes.ts` and added to the `all_node_info` array. Once this is done the node will be available in the editor.

```ts
// inst/editor/src/ui-node-definitions/uiNodeTypes.ts
...
import { input_action_button } from "./Shiny/ShinyActionButton/input_action_button";
...

export const all_node_info = [
    ...
    input_action_button,
    ...
    ];

...

```
