import type { InputWidgetCommonProps } from "../";
import inputClasses from "../Inputs.module.css";
import type { OnChangeCallback } from "../SettingsUpdateContext";
import { useOnChange } from "../SettingsUpdateContext";

import classes from "./styles.module.css";

export function BooleanInput({
  name,
  label,
  value,
  onChange,
  disabled,
  noLabel,
}: InputWidgetCommonProps<boolean>) {
  const onNewValue = useOnChange(onChange as OnChangeCallback);

  const labelValue = noLabel ? undefined : label ?? name;
  const checkboxId = `${name}-checkbox-input`;
  const mainCheckbox = (
    <div className={classes.container}>
      <span className={classes.valueLabel}>FALSE</span>
      <input
        className={classes.checkboxInput}
        id={checkboxId}
        aria-label={label ?? name + "Checkbox Input"}
        type="checkbox"
        disabled={disabled}
        checked={value}
        onChange={(e) => onNewValue({ name, value: e.target.checked })}
      />
      <label className={classes.checkboxLabel} htmlFor={checkboxId}>
        Toggle
      </label>
      <span className={classes.valueLabel}>TRUE</span>
    </div>
  );

  return labelValue !== undefined ? (
    <div className={inputClasses.container}>
      <label className={inputClasses.label}>{labelValue}:</label>
      {mainCheckbox}
    </div>
  ) : (
    mainCheckbox
  );
}

export default BooleanInput;
