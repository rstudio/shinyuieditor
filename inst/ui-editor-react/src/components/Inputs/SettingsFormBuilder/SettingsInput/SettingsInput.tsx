import Button from "components/Inputs/Button/Button";

import type {
  InputFieldTypesMap,
  InputFieldTypeNames,
  InputFieldInfoByType,
  FieldTypeUnion,
  KnownInputFieldTypes,
} from "../inputFieldTypes";
import { makeLabelId } from "../inputFieldTypes";

import "./SettingsInput.scss";

import { SettingsInputElement } from "./SettingsInputElement";
import { valueIsType } from "./valueIsType";

export type SettingsUpdateAction =
  | {
      type: "UPDATE";
      value: KnownInputFieldTypes;
    }
  | {
      type: "REMOVE";
    };

export type SettingsInputProps = {
  [ArgType in InputFieldTypeNames]: InputFieldInfoByType[ArgType] & {
    name: string;
    value?: InputFieldTypesMap[ArgType]["value"];
    onUpdate: (x: SettingsUpdateAction) => void;
  };
}[InputFieldTypeNames];

export function SettingsInput({ onUpdate, ...opts }: SettingsInputProps) {
  const argumentIsUnset = opts.value === undefined;
  const argumentIsOptional = opts.optional;
  const labelId = makeLabelId(opts.name);

  const setToDefault = () =>
    onUpdate({
      type: "UPDATE",
      value: opts.defaultValue,
    });

  const updateArgument = (newVal: KnownInputFieldTypes) =>
    onUpdate({ type: "UPDATE", value: newVal });

  const unsetArgument = () => onUpdate({ type: "REMOVE" });

  let mainInputBody: JSX.Element;

  if (opts.value === undefined) {
    if (opts.optional) {
      mainInputBody = <UnsetArgumentMessage labelledBy={labelId} />;
    } else {
      mainInputBody = (
        <MissingRequiredArgumentMessage
          name={opts.name}
          onReset={setToDefault}
        />
      );
    }
  } else {
    if (!valueIsType(opts.value, opts.inputType)) {
      mainInputBody = (
        <MismatchedTypeMessage name={opts.name} onReset={setToDefault} />
      );
    } else {
      mainInputBody = (
        <SettingsInputElement
          id={opts.name}
          onChange={updateArgument}
          {...(opts as FieldTypeUnion)}
        />
      );
    }
  }

  return (
    <div className="SUE-SettingsInput">
      <div className="info">
        {argumentIsOptional ? (
          <input
            type="checkbox"
            checked={!argumentIsUnset}
            title={`Use ${opts.name} argument`}
            aria-label={`Use ${opts.name} argument`}
            onChange={argumentIsUnset ? setToDefault : unsetArgument}
          />
        ) : null}

        <label id={makeLabelId(opts.name)}>{opts.label ?? opts.name}</label>
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

function UnsetArgumentMessage({ labelledBy }: { labelledBy: string }) {
  return (
    <div className="unset-argument" aria-labelledby={labelledBy}>
      Unset
    </div>
  );
}
