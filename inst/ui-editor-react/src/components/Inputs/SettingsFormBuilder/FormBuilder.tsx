import type { StringKeys } from "TypescriptUtils";
import { inANotInB } from "utils/array-helpers";

import type {
  FormInfo,
  FormValuesFromInfo,
  InputFieldTypeNames,
  StaticFieldInfoByType,
} from "./inputFieldTypes";
import type {
  SettingsInputProps,
  SettingsUpdateAction,
} from "./SettingsInput/SettingsInput";
import { SettingsInput } from "./SettingsInput/SettingsInput";
import { UnknownFormFields } from "./UnknownFormFields";

export type FormBuilderProps<Info extends FormInfo> = {
  settings: FormValuesFromInfo<Info>;
  settingsInfo: Info;
  /**
   * Props/values of the settings object that we don't want to show in the form
   */
  omitted?: string[];
  onSettingsChange: (name: string, action: SettingsUpdateAction) => void;
  renderInputs?: (x: InputComponentsOutput<Info>) => JSX.Element;
};

export type InputComponentsOutput<Info extends Record<string, any>> = {
  inputs: Record<StringKeys<Info>, JSX.Element>;
  unknownArguments: JSX.Element | null;
};

type FieldInfoSansOmited = StaticFieldInfoByType[InputFieldTypeNames];
type NonOmittedFormInfo = Record<string, FieldInfoSansOmited>;
function removeOmittedFields<Info extends FormInfo>(
  settingsInfo: Info
): {
  omitted: (keyof Info)[];
  nonOmittedFormInfo: NonOmittedFormInfo;
} {
  let omitted: (keyof Info)[] = [];

  let infoSansOmitted: Record<string, any> = {};

  for (let prop in settingsInfo) {
    if (settingsInfo[prop].inputType === "omitted") {
      omitted.push(prop);
    } else {
      infoSansOmitted[prop] = settingsInfo[prop];
    }
  }

  return {
    omitted,
    nonOmittedFormInfo: infoSansOmitted as NonOmittedFormInfo,
  };
}

export function FormBuilder<Info extends FormInfo>({
  renderInputs,
  settings,
  settingsInfo,
  onSettingsChange,
}: FormBuilderProps<Info>) {
  const { omitted, nonOmittedFormInfo } = removeOmittedFields(settingsInfo);

  // Find unknown arguments and return those too
  const unknownArgumentsNames = inANotInB(
    Object.keys(settings),
    Object.keys(settingsInfo)
  ).filter((name) => !omitted.includes(name));

  const PrebuildInputComponents = {
    inputs: knownArgumentInputs({
      settings,
      settingsInfo: nonOmittedFormInfo,
      onSettingsChange,
    }),
    unknownArguments:
      unknownArgumentsNames.length === 0 ? null : (
        <UnknownFormFields
          unknownArgumentsNames={unknownArgumentsNames}
          onSettingsChange={onSettingsChange}
        />
      ),
  } as InputComponentsOutput<Info>;

  return (
    <form className="FormBuilder">
      {renderInputs ? (
        renderInputs(PrebuildInputComponents)
      ) : (
        <AutobuildFormContents {...PrebuildInputComponents} />
      )}
    </form>
  );
}

function knownArgumentInputs<Info extends NonOmittedFormInfo>({
  settings,
  settingsInfo,
  onSettingsChange,
}: FormBuilderProps<Info>) {
  const InputsComponents: Record<string, JSX.Element> = {};

  keysOf(settingsInfo).forEach((name) => {
    if (typeof name !== "string")
      throw new Error("How did that non-string key get in here?");

    const infoForArg = settingsInfo[name];

    const currentValue = settings[name as keyof typeof settings];

    const inputProps = {
      ...infoForArg,
      name,
      value: currentValue,
      onUpdate: (updatedAction) => onSettingsChange(name, updatedAction),
    } as SettingsInputProps;

    InputsComponents[name] = <SettingsInput key={name} {...inputProps} />;
  });

  return InputsComponents;
}

function AutobuildFormContents<Info extends FormInfo>({
  inputs,
  unknownArguments,
}: InputComponentsOutput<Info>) {
  return (
    <>
      {Object.values(inputs)}
      {unknownArguments ? (
        <section>
          <h3>Unknown arguments</h3>
          {unknownArguments}
        </section>
      ) : null}
    </>
  );
}

function keysOf<T extends Object>(obj: T): Array<keyof T> {
  return Array.from(Object.keys(obj)) as any;
}
