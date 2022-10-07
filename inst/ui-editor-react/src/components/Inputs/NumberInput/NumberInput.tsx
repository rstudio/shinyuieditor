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
      <div className="incrementer-buttons">
        <button
          className="up-button"
          aria-label="Increment number up"
          onClick={incrementUp(value, onChange)}
        >
          <UpSpinnerButton />
        </button>
        <button
          className="down-button"
          aria-label="Increment number down"
          onClick={incrementDown(value, onChange)}
        >
          <DownSpinnerButton />
        </button>
      </div>
    </div>
  );
}

function makeNumberIncrementer(delta: number) {
  return (value: number, onChange: (value: number) => void) =>
    (clickEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      clickEvent.preventDefault();
      onChange(value + delta);
    };
}

const incrementUp = makeNumberIncrementer(1);
const incrementDown = makeNumberIncrementer(-1);
