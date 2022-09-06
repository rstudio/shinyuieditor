import React from "react";

import { removeDuplicates } from "utils/array-helpers";

import type { InputWidgetCommonProps } from "..";
import { InputWrapper } from "../InputWrapper";
import type { OnChangeCallback } from "../SettingsUpdateContext";
import { useOnChange } from "../SettingsUpdateContext";
import "./styles.scss";

type OptionsDropdownProps<Option extends string> = {
  options: Option[];
  selected: Option;
  onChange: (sel: Option) => void;
};

type SelectProps = Pick<
  React.ComponentPropsWithoutRef<"select">,
  "aria-label" | "disabled"
>;
export function OptionsDropdownSimple<Option extends string>({
  options,
  selected,
  onChange,
  ...passthrough
}: SelectProps & OptionsDropdownProps<Option>) {
  // Duplicate items won't be of much use so we should get rid of them
  const uniqueOptions = removeDuplicates(options);
  return (
    <select
      className="OptionsDropdown"
      onChange={(e) => onChange(options[e.target.selectedIndex])}
      value={selected}
      {...passthrough}
    >
      {uniqueOptions.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

export function OptionsDropdown<T extends object, Option extends string>({
  name,
  label,
  options,
  allValues,
  onChange,
  optional = false,
}: InputWidgetCommonProps<T, string> & {
  options: Option[];
}) {
  const value = allValues[name] as Option;
  const argName = name as string;
  const onNewValue = useOnChange(onChange as OnChangeCallback);

  const isDisabled = value === undefined;

  return (
    <InputWrapper
      name={argName}
      label={label}
      optional={optional}
      isDisabled={isDisabled}
      defaultValue={options[0]}
      width_setting="full"
      mainInput={
        <OptionsDropdownSimple
          aria-label={"input for " + argName}
          options={options}
          selected={value}
          onChange={(x) => onNewValue({ name: argName, value: x })}
          disabled={isDisabled}
        />
      }
    />
  );
}
