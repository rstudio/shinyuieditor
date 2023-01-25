import * as React from "react";

import { NumberInputSimple } from "../../components/Inputs/NumberInput/NumberInput";
import { mergeClasses } from "../../utils/mergeClasses";
import type { UiNodeComponent } from "../uiNodeTypes";

import type { ShinyNumericInputProps } from ".";

import classes from "./styles.module.css";

const ShinyNumericInput: UiNodeComponent<ShinyNumericInputProps> = ({
  uiArguments,
  wrapperProps,
}) => {
  const settings = { ...uiArguments };

  const width = settings.width ?? "200px";

  const [value, setValue] = React.useState(settings.value);

  React.useEffect(() => {
    setValue(settings.value);
  }, [settings.value]);

  return (
    <div
      className={mergeClasses(classes.container, "shiny::numericInput")}
      style={{ width }}
      {...wrapperProps}
    >
      <span>{settings.label}</span>
      <NumberInputSimple
        type="number"
        value={value}
        onChange={setValue}
        min={settings.min}
        max={settings.max}
        step={settings.step}
      />
    </div>
  );
};
export default ShinyNumericInput;
