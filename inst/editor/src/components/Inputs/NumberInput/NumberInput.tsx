import React from "react";

import "./NumberInput.scss";
import type { InputComponentByType } from "../../../ui-node-definitions/inputFieldTypes";
import { makeLabelId } from "../../../ui-node-definitions/inputFieldTypes";
import { mergeClasses } from "../../../utils/mergeClasses";
import { DownSpinnerButton, UpSpinnerButton } from "../../Icons";

export function NumberInput({
  id,
  label,
  value,
  onChange,
}: InputComponentByType<"number">) {
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
  min?: number;
  max?: number;
  /** Optional classes to be applied to the input element */
  inputClassName?: string;
  value: number | null;
  onChange: (x: number) => void;
};

export function NumberInputSimple({
  value,
  onChange,
  min = 0,
  max,
  step,
  disabled,
  inputClassName,
  ...passthroughProps
}: NumberInputSimpleProps) {
  const { displayedVal, handleChange, handleBlur, incrementUp, incrementDown } =
    useNumberInput({
      min,
      max,
      step,
      value,
      onChange,
    });

  const tooBig = isNumber(value) && isNumber(max) && value > max;
  const tooSmall = isNumber(value) && isNumber(min) && value < min;
  const isInvalid = tooBig || tooSmall;

  return (
    <div
      className="NumberInput SUE-Input"
      aria-disabled={disabled}
      onBlur={handleBlur}
    >
      <input
        {...passthroughProps}
        className={mergeClasses("input-field", inputClassName, {
          "invalid:bg-red-100 invalid:border-danger invalid:outline-danger":
            isInvalid,
        })}
        type="number"
        placeholder={"0"}
        value={displayedVal}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={handleChange}
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
      {isInvalid ? (
        <div className="text-danger text-xs absolute left-0 w-max">
          {tooBig ? `Max allowed: ${max}` : `Min allowed: ${min}`}
        </div>
      ) : null}
    </div>
  );
}

// Right now this is a bit overzealous with rerendering, rendering 2 times for
// every state change. Not sure how to fix it and seems like a small performance
// penalty now.
function useNumberInput({
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
  const incrementValue = React.useCallback(
    (dir: "up" | "down") => {
      return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (!isNumber(value)) return;
        if (!isNumber(step)) return;

        const newValue = value + (dir === "up" ? 1 : -1) * step;

        if (isNumber(min) && min > newValue) return;

        if (isNumber(max) && max < newValue) return;

        onChange(newValue);
      };
    },
    [max, min, onChange, step, value]
  );

  const incrementUp = React.useMemo(
    () => incrementValue("up"),
    [incrementValue]
  );

  const incrementDown = React.useMemo(
    () => incrementValue("down"),
    [incrementValue]
  );

  // Create an internal state to let us manipulate the value easier to do things
  // like show the placeholder 0 intead of a true zero when the user deletes all
  // the elements
  const [realVal, setRealVal] = React.useState<number | null | string>(value);

  // Sync the passed in value with our internal state
  React.useEffect(() => setRealVal(value), [value]);

  // When a change happens in the input, update our internal state
  const handleChange: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback(
      (e) => {
        const newVal = e.target.value;

        setRealVal((oldVal) =>
          Number(oldVal) === Number(newVal) ? oldVal : newVal
        );
        onChange(Number(newVal));
      },
      [onChange]
    );

  // When the user blurs, we can clean up any leading zeros they may have added
  const handleBlur = React.useCallback(() => {
    setRealVal((currentVal) => Number(currentVal).toString());
  }, []);

  // If the user has backspaced to 0, then we want the placeholder to show the
  // zero so they can start typing a new number without un-avoidable 0s
  // prefixing it.
  const displayedVal = realVal === 0 || realVal === null ? "" : realVal;

  return {
    incrementUp,
    incrementDown,
    handleChange,
    displayedVal,
    handleBlur,
  };
}

function isNumber(x: unknown): x is number {
  return typeof x === "number";
}
