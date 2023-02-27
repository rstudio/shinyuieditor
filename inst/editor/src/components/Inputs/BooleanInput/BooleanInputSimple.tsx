import { mergeClasses } from "../../../utils/mergeClasses";
import type { InputComponentByType } from "../SettingsFormBuilder/inputFieldTypes";
import { makeLabelId } from "../SettingsFormBuilder/inputFieldTypes";

import classes from "./styles.module.css";

export function BooleanInput({
  id,
  label,
  value,
  onChange,
}: InputComponentByType<"boolean">) {
  const checkboxId = `${id}-checkbox-input`;
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    onChange(e.target.checked);
  return (
    <>
      <input
        className={mergeClasses("SUE-Input", classes.checkboxInput)}
        id={checkboxId}
        aria-labelledby={makeLabelId(id)}
        aria-label={label}
        type="checkbox"
        checked={value}
        onChange={handleChange}
      />
      <label
        className={classes.checkboxLabel}
        htmlFor={checkboxId}
        data-value={value ? "TRUE" : "FALSE"}
      >
        Toggle
      </label>
    </>
  );
}
