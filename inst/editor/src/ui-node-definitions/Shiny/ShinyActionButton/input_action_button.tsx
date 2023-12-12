import buttonIcon from "../../../assets/icons/shinyButton.png";
import Button from "../../../components/Inputs/Button/Button";
import type { CSSMeasure } from "../../inputFieldTypes";
import { nodeInfoFactory } from "../../nodeInfoFactory";

export const input_action_button = nodeInfoFactory<{
  inputId: string;
  label: string;
  width?: CSSMeasure;
}>()({
  title: "Action Button",
  r_info: {
    fn_name: "actionButton",
    package: "shiny",
    input_bindings: true,
  },
  py_info: {
    fn_name: "ui.input_action_button",
    package: "shiny",
    input_bindings: true,
  },
  id: "actionButton",
  takesChildren: false,
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
  category: "Inputs",
  description:
    "Creates an action button whose value is initially zero, and increments by one each time it is pressed.",
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
  iconSrc: buttonIcon,
});
