import * as React from "react";

import inputClasses from "../Inputs.module.css";
import type { OnChangeCallback } from "../SettingsUpdateContext";
import { useOnChange } from "../SettingsUpdateContext";

import classes from "./RadioInputs.module.css";

export function RadioInputs<OptionType extends string>({
  name,
  label,
  options,
  currentSelection,
  onChange,
  optionsPerColumn,
}: {
  name: string;
  label?: string;
  options: Record<OptionType, { icon: JSX.Element | string; label?: string }>;
  currentSelection: OptionType;
  onChange?: (x: { name: string; value: OptionType }) => void;
  optionsPerColumn?: number;
}) {
  const values = Object.keys(options) as OptionType[];
  const onNewValue = useOnChange(onChange as OnChangeCallback);

  return (
    <div className={inputClasses.container}>
      <label htmlFor={name} className={inputClasses.label}>
        {label ?? name}:
      </label>
      <fieldset
        className={classes.radioContainer}
        id={name}
        style={{
          gridTemplateColumns: `repeat(${
            optionsPerColumn ?? "auto-fill"
          }, minmax(65px, 1fr))`,
        }}
      >
        {values.map((option) => {
          const { icon, label = option } = options[option] ?? {};

          return (
            <div className={classes.option} key={option}>
              <input
                className={classes.radioInput}
                name={name}
                id={name + option}
                type="radio"
                value={option}
                onChange={() => onNewValue({ name, value: option })}
                checked={option === currentSelection}
              />
              <label
                className={classes.radioLabel}
                htmlFor={name + option}
                data-name={label}
              >
                <span className={classes.optionIcon}>
                  {typeof icon === "string" ? (
                    <img src={icon} alt={label} className={classes.icon} />
                  ) : (
                    icon
                  )}
                </span>
              </label>
            </div>
          );
        })}
      </fieldset>
    </div>
  );
}
