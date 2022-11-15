import Button from "../../Button/Button";
import type {
  FieldEntryUnion,
  InputFieldEntryNames,
  InputFieldEntryMap,
  KnownInputFieldTypes,
  StaticFieldInfoByType,
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
  [ArgType in InputFieldEntryNames]: StaticFieldInfoByType[ArgType] & {
    name: string;
    value?: InputFieldEntryMap[ArgType]["value"];
    onUpdate: (x: SettingsUpdateAction) => void;
  };
}[InputFieldEntryNames];

export function SettingsInput({ onUpdate, ...opts }: SettingsInputProps) {
  const argumentIsUnset = opts.value === undefined;
  const argumentIsOptional = opts.optional;
  const labelId = makeLabelId(opts.name);
  const label = opts.label ?? opts.name;

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
          label={label}
          id={opts.name}
          onChange={updateArgument}
          {...(opts as FieldEntryUnion)}
        />
      );
    }
  }

  return (
    <div className="SUE-SettingsInput">
      <div className="info" data-unset={argumentIsUnset}>
        {argumentIsOptional ? (
          <input
            type="checkbox"
            checked={!argumentIsUnset}
            title={`Use ${opts.name} argument`}
            aria-label={`Use ${opts.name} argument`}
            onChange={argumentIsUnset ? setToDefault : unsetArgument}
          />
        ) : null}
        <label id={labelId}>{label}</label>
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
    <input
      className="unset-argument SUE-Input"
      aria-labelledby={labelledBy}
      placeholder="Default"
      disabled
    />
  );
}