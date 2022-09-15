import type { InputComponentProps } from "../SettingsFormBuilder/ArgumentInfo";
import { makeLabelId } from "../SettingsFormBuilder/ArgumentInfo";

import classes from "./styles.module.css";

export function BooleanInputSimple({
  id,
  value,
  onChange,
}: InputComponentProps<boolean>) {
  const checkboxId = `${id}-checkbox-input`;
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    onChange(e.target.checked);
  return (
    <>
      <input
        className={classes.checkboxInput}
        id={checkboxId}
        aria-labelledby={makeLabelId(id)}
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
