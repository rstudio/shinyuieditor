import React from "react";

import { removeDuplicates } from "utils/array-helpers";

import type { InputComponentProps } from "../SettingsFormBuilder/ArgumentInfo";
import { makeLabelId } from "../SettingsFormBuilder/ArgumentInfo";

export type DropdownOption = string;

// This is used to determine if the default value is chosen. Since the default
// value will depend on the current options we need a way to trigger that
// internally. Hopefully noone uses this as an option.
export const DEFAULT_DROPDOWN_CHOICE = "__DEFAULT-DROPDOWN-CHOICE__";

export function DropdownSelect({
  id,
  choices,
  onChange,
  value: selected,
}: InputComponentProps<DropdownOption, { choices: DropdownOption[] }>) {
  // Reset the current selection if it gets out of sync with the options
  React.useEffect(() => {
    if (selected === DEFAULT_DROPDOWN_CHOICE) {
      onChange(choices[0]);
    }
    if (selected !== undefined && !choices.includes(selected)) {
      onChange(choices[0]);
    }
  }, [onChange, choices, selected]);

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selectedIndex = e.target.selectedIndex;
    onChange(choices[selectedIndex]);
  };

  // Duplicate items won't be of much use so we should get rid of them
  const uniqueOptions = removeDuplicates(choices);
  return (
    <select
      aria-labelledby={makeLabelId(id)}
      className="OptionsDropdown"
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
