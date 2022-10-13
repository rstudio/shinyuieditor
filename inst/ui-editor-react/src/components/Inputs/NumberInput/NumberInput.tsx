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
    <NumberInputSimple
      id={id}
      aria-label={label}
      aria-labelledby={makeLabelId(id)}
      value={value}
      onChange={onChange}
    />
  );
}

type NumberInputSimpleProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "value" | "onChange"
> & {
  value: number | null;
  onChange: (x: number) => void;
};

export function NumberInputSimple({
  value,
  onChange,
  min,
  max,
  step,
  disabled,
  ...passthroughProps
}: NumberInputSimpleProps) {
  const { incrementUp, incrementDown } = useIncrementerButtons({
    min,
    max,
    step,
    value,
    onChange,
  });
  return (
    <div className="NumberInput SUE-Input" aria-disabled={disabled}>
      <input
        {...passthroughProps}
        className="input-field"
        type="number"
        value={value ?? 0}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="incrementer-buttons">
        <button
          className="up-button"
          aria-label="Increment number up"
          onClick={incrementUp}
          type="button"
        >
          <UpSpinnerButton />
        </button>
        <button
          className="down-button"
          aria-label="Increment number down"
          onClick={incrementDown}
          type="button"
        >
          <DownSpinnerButton />
        </button>
      </div>
    </div>
  );
}

function useIncrementerButtons({
  min = -Infinity,
  max = Infinity,
  step = 1,
  value,
  onChange,
}: {
  step: string | number | undefined;
  min: string | number | undefined;
  max: string | number | undefined;
  value: number | null;
  onChange: (value: number) => void;
}) {
  function incrementValue(dir: "up" | "down") {
    return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      if (typeof value !== "number") return;
      if (typeof step !== "number") return;

      const newValue = value + (dir === "up" ? 1 : -1) * step;

      if (typeof min === "number" && min > newValue) return;

      if (typeof max === "number" && max < newValue) return;

      onChange(newValue);
    };
  }

  return {
    incrementUp: incrementValue("up"),
    incrementDown: incrementValue("down"),
  };
}
