import Button from "components/Inputs/Button/Button";
import { isCSSMeasure } from "CSSMeasure";

import type {
  ArgTypesMap,
  ArgTypesNames,
  KnownArgTypes,
  PossibleArgTypes,
} from "../ArgumentInfo";

import "./SettingsInput.scss";

import type { SettingsInputElementProps } from "./SettingsInputElement";
import { SettingsInputElement } from "./SettingsInputElement";

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
    type,
    label = name,
    defaultValue,
    requiredOrOptional = "required",
    onChange,
    options,
  } = opts;

  const argumentIsUnset = value === undefined;
  const argumentIsOptional = requiredOrOptional === "optional";

  const setToDefault = () =>
    onChange({
      type: "UPDATE",
      value: defaultValue,
    });
  const unsetArgument = () => onChange({ type: "REMOVE" });

  let mainInputBody: JSX.Element;
  if (argumentIsUnset && !argumentIsOptional) {
    mainInputBody = (
      <MissingRequiredArgumentMessage name={name} onReset={setToDefault} />
    );
  } else if (!valueIsType(value, type)) {
    mainInputBody = (
      <MismatchedTypeMessage name={name} onReset={setToDefault} />
    );
  } else {
    const inputArgs = {
      id: name,
      type,
      value,
      onChange: (newVal) => onChange({ type: "UPDATE", value: newVal }),
      options,
    } as SettingsInputElementProps;

    mainInputBody = <SettingsInputElement {...inputArgs} />;
  }

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
      {mainInputBody}
    </div>
  );
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

function valueIsType(value: PossibleArgTypes, type: ArgTypesNames): boolean {
  if (value === undefined) {
    return true;
  }
  if (type === "number") {
    return typeof value === "number";
  }
  if (type === "string") {
    return typeof value === "string";
  }
  if (type === "cssMeasure") {
    return isCSSMeasure(value as string);
  }

  throw new Error("Unimplemented argument type check", type);
}
