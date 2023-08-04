import { mergeClasses } from "../../../../utils/mergeClasses";
import Button from "../../Button/Button";
import type {
  InputOptions,
  InputTypeNames,
  KnownInputFieldTypes,
  StaticInputOptionsByInputType,
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
  [ArgType in InputTypeNames]: StaticInputOptionsByInputType[ArgType] & {
    optional?: true;
    name: string;
    value?: StaticInputOptionsByInputType[ArgType]["defaultValue"];
    onUpdate: (x: SettingsUpdateAction) => void;
  };
}[InputTypeNames];

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
          {...(opts as InputOptions)}
        />
      );
    }
  }

  return (
    <InputLabelWrapper
      argumentIsUnset={argumentIsUnset}
      optionalField={
        argumentIsOptional ? (
          <input
            type="checkbox"
            checked={!argumentIsUnset}
            title={`Use ${opts.name} argument`}
            aria-label={`Use ${opts.name} argument`}
            onChange={argumentIsUnset ? setToDefault : unsetArgument}
          />
        ) : null
      }
      label={label}
      labelId={labelId}
      mainInput={mainInputBody}
    />
  );
}

export function InputLabelWrapper({
  argumentIsUnset = false,
  className,
  optionalField,
  label,
  labelId,
  mainInput,
}: {
  className?: string;
  argumentIsUnset?: boolean;
  optionalField?: React.ReactNode;
  label: string;
  labelId: string;
  mainInput: React.ReactNode;
}) {
  return (
    <div className={mergeClasses("SUE-SettingsInput", className)}>
      <div className="info" data-unset={argumentIsUnset}>
        {optionalField}
        <label id={labelId}>{label}</label>
      </div>
      {mainInput}
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
