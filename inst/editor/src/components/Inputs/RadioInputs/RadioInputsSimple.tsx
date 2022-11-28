import * as React from "react";

import type { InputComponentProps } from "../SettingsFormBuilder/inputFieldTypes";
import { makeLabelId } from "../SettingsFormBuilder/inputFieldTypes";

import classes from "./RadioInputs.module.css";

export type RadioOption = string;
export type RadioOptions = Record<
  RadioOption,
  { icon: JSX.Element | string; label?: string }
>;
export const DEFAULT_RADIO_CHOICE = "__DEFAULT-RADIO-CHOICE__";

export function RadioInputs({
  id,
  label,
  choices,
  value: currentSelection,
  onChange,
  optionsPerColumn,
}: InputComponentProps<
  RadioOption,
  {
    choices: RadioOptions;
    optionsPerColumn?: number;
  }
>) {
  const values = Object.keys(choices) as RadioOption[];

  // If we've been given the reset signal default to the first option
  React.useEffect(() => {
    if (currentSelection === DEFAULT_RADIO_CHOICE) {
      onChange(values[0]);
    }
  }, [values, currentSelection, onChange]);

  const columns_style_defn = React.useMemo(
    () => ({
      gridTemplateColumns: optionsPerColumn
        ? `repeat(${optionsPerColumn}, 1fr)`
        : undefined,
    }),
    [optionsPerColumn]
  );

  return (
    <fieldset
      className={classes.radioContainer}
      aria-labelledby={makeLabelId(id)}
      aria-label={label}
      style={columns_style_defn}
    >
      {values.map((option) => {
        const { icon, label = option } = choices[option] ?? {};
        const optionId = id + option;
        return (
          <div className={classes.option} key={option}>
            <input
              className={classes.radioInput}
              name={id}
              id={optionId}
              type="radio"
              value={option}
              onChange={() => onChange(option)}
              checked={option === currentSelection}
            />
            <label
              className={classes.radioLabel}
              htmlFor={optionId}
              data-name={label}
            >
              {typeof icon === "string" ? (
                <img src={icon} alt={label} className={classes.icon} />
              ) : (
                icon
              )}
            </label>
          </div>
        );
      })}
    </fieldset>
  );
}
