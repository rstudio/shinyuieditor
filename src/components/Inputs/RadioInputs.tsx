import * as React from "react";
import classes from "./RadioInputs.module.css";
import inputClasses from "./Inputs.module.css";

export function RadioInputs<OptionType extends string>({
  name,
  options,
  optionIcons,
  currentSelection,
  onChange,
  optionsPerColumn,
}: {
  name: string;
  options: OptionType[];
  optionIcons?: Record<OptionType, JSX.Element>;
  currentSelection: OptionType;
  onChange: (selection: OptionType) => void;
  optionsPerColumn?: number;
}) {
  return (
    <div className={inputClasses.container}>
      <label htmlFor={name} className={inputClasses.label}>
        {name}:
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
                onChange={() => onChange(option)}
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
