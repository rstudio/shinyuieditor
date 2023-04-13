import icon from "../../assets/icons/shinycheckbox.png";
import type { CSSMeasure } from "../../components/Inputs/CSSUnitInput/CSSMeasure";
import { nodeInfoFactory } from "../nodeInfoFactory";

import ShinyCheckboxInput from "./ShinyCheckboxInput";

export type ShinyCheckboxInputProps = {
  inputId: string;
  label: string;
  value: boolean;
  width?: CSSMeasure;
};

export const shinyCheckboxInputInfo =
  nodeInfoFactory<ShinyCheckboxInputProps>()({
    id: "checkboxInput",
    r_info: {
      fn_name: "checkboxInput",
      package: "shiny",
    },
    title: "Checkbox Input",
    takesChildren: false,
    UiComponent: ShinyCheckboxInput,
    settingsInfo: {
      inputId: {
        inputType: "string",
        label: "inputId",
        defaultValue: "myCheckboxInput",
      },
      label: {
        inputType: "string",
        label: "label",
        defaultValue: "Checkbox Input",
      },
      value: {
        inputType: "boolean",
        label: "Starting value",
        defaultValue: false,
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
    iconSrc: icon,
    category: "Inputs",
    description:
      "Create a checkbox that can be used to specify logical values.",
  });
