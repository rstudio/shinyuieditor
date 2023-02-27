import * as React from "react";

import type { InputComponentByType } from "../SettingsFormBuilder/inputFieldTypes";
import { makeLabelId } from "../SettingsFormBuilder/inputFieldTypes";

import styles from "./RadioInputs.module.css";

export type RadioOption = string;
type OptionDisplayInfo =
  | { icon: JSX.Element | string; label?: string }
  | { label: string };
export type RadioOptions = Record<RadioOption, OptionDisplayInfo>;
export const DEFAULT_RADIO_CHOICE = "__DEFAULT-RADIO-CHOICE__";

export function RadioInputs({
  id,
  label,
  choices,
  value: currentSelection,
  onChange,
  optionsPerColumn,
}: InputComponentByType<"radio">) {
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
      className={styles.radioContainer}
      aria-labelledby={makeLabelId(id)}
      aria-label={label}
      style={columns_style_defn}
    >
      {values.map((option) => {
        const optionId = id + option;
        const info = choices[option];
        const icon = "icon" in info ? info.icon : null;
        const text_only = icon === null;
        const label = info.label ?? option;

        return (
          <div className={styles.option} key={option}>
            <input
              className={styles.radioInput}
              name={id}
              id={optionId}
              type="radio"
              value={option}
              onChange={() => onChange(option)}
              checked={option === currentSelection}
            />
            <label
              className={styles.radioLabel}
              htmlFor={optionId}
              data-name={text_only ? null : label}
            >
              {text_only ? (
                // We have no icon at all and want to just show the label text
                <span className={styles.text_only_label}>{label}</span>
              ) : typeof icon === "string" ? (
                // Icon being a string is a path to an icon png so place in image
                <img src={icon} alt={label} className={styles.icon} />
              ) : (
                // Otherwise, if the icon is present it's a jsx element so we just need to
                // give that back
                icon
              )}
            </label>
          </div>
        );
      })}
    </fieldset>
  );
}
