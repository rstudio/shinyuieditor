import type { InputComponentByType } from "../../../ui-node-definitions/inputFieldTypes";
import { makeLabelId } from "../../../ui-node-definitions/inputFieldTypes";
import { mergeClasses } from "../../../utils/mergeClasses";

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
