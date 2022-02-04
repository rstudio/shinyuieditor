import * as React from "react";
import classes from "./RadioInputs.module.css";
import inputClasses from "./Inputs.module.css";

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
    <div className={inputClasses.container}>
      <label htmlFor={name} className={inputClasses.label}>
        {name}:
      </label>
      <fieldset className={classes.radioInputs}>
        {options.map((option) => (
          <div className={classes.option} key={option}>
            <input
              name={name}
              type="radio"
              value={option}
              onChange={() => onChange(option)}
              checked={option === currentSelection}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </fieldset>
    </div>
  );
}
