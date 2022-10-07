import { DownSpinnerButton, UpSpinnerButton } from "components/Icons";

import type { InputComponentProps } from "../SettingsFormBuilder/inputFieldTypes";
import { makeLabelId } from "../SettingsFormBuilder/inputFieldTypes";
import "./NumberInput.scss";

export function NumberInput({
  id,
  label,
  value,
  onChange,
}: InputComponentProps<number>) {
  return (
    <div className="NumberInput SUE-Input">
      <input
        className="input-field"
        id={id}
        aria-label={label}
        aria-labelledby={makeLabelId(id)}
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <button
        className="up-button"
        aria-label="Increment number up"
        onClick={() => onChange(value + 1)}
      >
        <UpSpinnerButton />
      </button>
      <button
        className="down-button"
        aria-label="Increment number down"
        onClick={() => onChange(value - 1)}
      >
        <DownSpinnerButton />
      </button>
    </div>
  );
}
