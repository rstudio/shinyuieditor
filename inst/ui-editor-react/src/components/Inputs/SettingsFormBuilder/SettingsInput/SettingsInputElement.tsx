import { BooleanInput } from "components/Inputs/BooleanInput/BooleanInputSimple";
import { CSSUnitInput } from "components/Inputs/CSSUnitInput/CSSUnitInput";
import { NamedListInput } from "components/Inputs/ListInput/NamedListInput";
import { DropdownSelect } from "components/Inputs/OptionsDropdown/DropdownSelect";
import { RadioInputs } from "components/Inputs/RadioInputs/RadioInputsSimple";
import { match } from "ts-pattern";

import type { FieldEntryUnion, KnownInputFieldTypes } from "../inputFieldTypes";

import { NumberInput } from "./NumberInput";
import { StringInput } from "./StringInput";

/**
 * Due to dynamics of types the on change callback is a very general purpose
 * function that can take any of our input types as arguments. Type narrowing is
 * not really beneficial here since we already know the type and the callback is
 * generated by the code not provided by the user.
 */
export type OnChangeCallback = (newValue: KnownInputFieldTypes) => void;

type SettingsInputElementProps = FieldEntryUnion & {
  id: string;
  label: string;
  onChange: OnChangeCallback;
};

export function SettingsInputElement(args: SettingsInputElementProps) {
  return match(args)
    .with({ inputType: "string" }, (x) => <StringInput {...x} />)
    .with({ inputType: "number" }, (x) => <NumberInput {...x} />)
    .with({ inputType: "cssMeasure" }, (x) => <CSSUnitInput {...x} />)
    .with({ inputType: "boolean" }, (x) => <BooleanInput {...x} />)
    .with({ inputType: "list" }, (x) => <NamedListInput {...x} />)
    .with({ inputType: "dropdown" }, (x) => <DropdownSelect {...x} />)
    .with({ inputType: "radio" }, (x) => <RadioInputs {...x} />)
    .otherwise(({ inputType }) => (
      <div>
        I don't know how to render the input of type {inputType} yet! Sorry.
      </div>
    ));
}
