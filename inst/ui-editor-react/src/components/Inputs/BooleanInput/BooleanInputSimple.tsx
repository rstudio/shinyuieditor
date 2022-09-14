import type { InputComponentProps } from "../SettingsFormBuilder/ArgumentInfo";

import classes from "./styles.module.css";

export function BooleanInputSimple({
  id = "SUE-boolean-input",
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
