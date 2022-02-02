import * as React from "react";
import classes from "./RadioInputs.module.css";

export function RadioInputs<OptionType extends string>({
  name,
  options,
  currentSelection,
  onChange,
}: {
  name: string;
  options: OptionType[];
  currentSelection: OptionType;
  onChange: (selection: OptionType) => void;
}) {
  return (
    <div className={classes.formSection}>
      <p>{name}:</p>
      <fieldset
        className={classes.radioInputs}
        onChange={(e) => {
          onChange((e.target as HTMLInputElement).value as OptionType);
        }}
      >
        {options.map((option) => (
          <div key={option}>
            <input
              name={name}
              type="radio"
              value={option}
              checked={option === currentSelection}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </fieldset>
    </div>
  );
}
