import Button from "components/Inputs/Button/Button";

import type {
  ArgTypesMap,
  ArgTypesNames,
  KnownArgTypes,
} from "../ArgumentInfo";

import "./SettingsInput.scss";

import type { SettingsInputElementProps } from "./SettingsInputElement";
import { SettingsInputElement } from "./SettingsInputElement";
import { valueIsType } from "./valueIsType";

export type SettingsUpdateAction =
  | {
      type: "UPDATE";
      value: KnownArgTypes;
    }
  | {
      type: "REMOVE";
    };

export type SettingsInputProps = {
  [T in ArgTypesNames]: {
    name: string;
    type: T;
    value?: ArgTypesMap[T]["defaultValue"];
    defaultValue: ArgTypesMap[T]["defaultValue"];
    onChange: (x: SettingsUpdateAction) => void;
    options?: ArgTypesMap[T]["options"];
    label?: string;
    requiredOrOptional?: "optional" | "required";
  };
}[ArgTypesNames];

export function SettingsInput(opts: SettingsInputProps) {
  const {
    name,
    value,
    label = name,
    defaultValue,
    requiredOrOptional = "required",
    onChange,
  } = opts;

  const argumentIsUnset = value === undefined;
  const argumentIsOptional = requiredOrOptional === "optional";

  const setToDefault = () =>
    onChange({
      type: "UPDATE",
      value: defaultValue,
    });

  const updateArgument = (newVal: KnownArgTypes) =>
    onChange({ type: "UPDATE", value: newVal });
  const unsetArgument = () => onChange({ type: "REMOVE" });

  return (
    <div className="SUE-SettingsInput">
      <div className="info">
        {argumentIsOptional ? (
          <input
            type="checkbox"
            checked={!argumentIsUnset}
            title={`Click to ${
              argumentIsUnset ? "set" : "unset"
            } ${name} property`}
            onChange={argumentIsUnset ? setToDefault : unsetArgument}
          />
        ) : null}

        <label htmlFor={name}>{label}</label>
      </div>
      <MainInputBody
        {...opts}
        onReset={setToDefault}
        onUpdate={updateArgument}
      />
    </div>
  );
}

function MainInputBody(
  opts: Pick<
    SettingsInputProps,
    "name" | "value" | "type" | "requiredOrOptional" | "options"
  > & {
    onUpdate: (newVal: KnownArgTypes) => void;
    onReset: () => void;
  }
) {
  const {
    name,
    value,
    type,
    requiredOrOptional = "required",
    options,
    onReset,
    onUpdate,
  } = opts;

  const argumentIsUnset = value === undefined;
  const argumentIsOptional = requiredOrOptional === "optional";

  if (argumentIsUnset && argumentIsOptional) {
    return <UnsetArgumentMessage />;
  }

  if (argumentIsUnset && !argumentIsOptional) {
    return <MissingRequiredArgumentMessage name={name} onReset={onReset} />;
  }

  if (valueIsType(value, type)) {
    const inputArgs = {
      id: name,
      type,
      value,
      onChange: onUpdate,
      options,
    } as SettingsInputElementProps;

    return <SettingsInputElement {...inputArgs} />;
  }

  return <MismatchedTypeMessage name={name} onReset={onReset} />;
}

function MismatchedTypeMessage({
  name,
  onReset,
}: {
  name: string;
  onReset: () => void;
}) {
  return (
    <div className="mismatched-argument-types">
      Argument for {name} of unsupported type.
      <Button
        style={{ padding: "0.25rem 0.5rem", marginInline: "0.25rem" }}
        onClick={onReset}
      >
        Reset
      </Button>
    </div>
  );
}
function MissingRequiredArgumentMessage({
  name,
  onReset,
}: {
  name: string;
  onReset: () => void;
}) {
  return (
    <div className="missing-required-argument-message">
      Required argument "{name}" not provided.
      <Button
        style={{ padding: "0.25rem 0.5rem", marginInline: "0.25rem" }}
        onClick={onReset}
      >
        Reset
      </Button>
    </div>
  );
}

function UnsetArgumentMessage() {
  return <div className="unset-argument">Unset</div>;
}
