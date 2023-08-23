import React from "react";


import type { InputComponentByType } from "ui-node-definitions/src/inputFieldTypes";
import { makeLabelId } from "ui-node-definitions/src/inputFieldTypes";
import { removeDuplicates } from "util-functions/src/arrays";
import "./styles.scss";

export type DropdownOption = string;

// This is used to determine if the default value is chosen. Since the default
// value will depend on the current options we need a way to trigger that
// internally. Hopefully noone uses this as an option.
export const DEFAULT_DROPDOWN_CHOICE = "__DEFAULT-DROPDOWN-CHOICE__";

export function DropdownSelect({
  id,
  label,
  choices,
  onChange,
  value: selected,
}: InputComponentByType<"dropdown">) {
  // Reset the current selection if it gets out of sync with the options
  React.useEffect(() => {
    if (selected === DEFAULT_DROPDOWN_CHOICE) {
      onChange(choices[0]);
    }
    if (choices.length > 0 && !choices.includes(selected)) {
      onChange(choices[0]);
    }
  }, [onChange, choices, selected]);

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selectedIndex = e.target.selectedIndex;
    onChange(choices[selectedIndex]);
  };

  // Duplicate items won't be of much use so we should get rid of them
  const uniqueOptions = removeDuplicates(choices);

  if (uniqueOptions.length === 0) {
    return (
      <select
        title={`${label} selector`}
        aria-labelledby={makeLabelId(id)}
        aria-label={label}
        className="OptionsDropdown SUE-Input"
        placeholder="No available options"
      ></select>
    );
  }
  return (
    <select
      title={`${label} selector`}
      aria-labelledby={makeLabelId(id)}
      className="OptionsDropdown SUE-Input"
      onChange={handleChange}
      value={selected}
    >
      {uniqueOptions.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
