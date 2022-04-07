import * as React from "react";

import inputClasses from "../Inputs.module.css";
import type { OnChangeCallback } from "../SettingsUpdateContext";
import { useOnChange } from "../SettingsUpdateContext";

import classes from "./RadioInputs.module.css";

export function RadioInputs<OptionType extends string>({
  name,
  label,
  options,
  optionIcons,
  currentSelection,
  onChange,
  optionsPerColumn,
}: {
  name: string;
  label?: string;
  options: OptionType[];
  optionIcons?: Record<OptionType, JSX.Element>;
  currentSelection: OptionType;
  onChange?: (x: { name: string; value: OptionType }) => void;
  optionsPerColumn?: number;
}) {
  const onNewValue = useOnChange(onChange as OnChangeCallback);

  return (
    <div className={inputClasses.container}>
      <label htmlFor={name} className={inputClasses.label}>
        {label ?? name}:
      </label>
      <fieldset
        id={name}
        style={{
          gridTemplateColumns: `repeat(${
            optionsPerColumn ?? "auto-fill"
          }, minmax(65px, 1fr))`,
        }}
      >
        {options.map((option) => {
          return (
            <div className={classes.option} key={option}>
              <input
                name={name}
                id={name + option}
                type="radio"
                value={option}
                onChange={() => onNewValue({ name, value: option })}
                checked={option === currentSelection}
              />
              <label htmlFor={name + option}>
                {optionIcons?.[option] ?? option}
              </label>
            </div>
          );
        })}
      </fieldset>
    </div>
  );
}
