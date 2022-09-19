import { Trash } from "components/Icons";

import Button from "../Button/Button";

import type { SettingsInputsBuilderProps } from "./FormBuilder";
import type { FormInfo } from "./inputFieldTypes";

function UnknownFieldItem({
  name,
  onRemove,
}: {
  name: string;
  onRemove: () => void;
}) {
  const description = `Remove ${name} argument`;
  const handleClick: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    onRemove();
  };
  return (
    <li aria-label="Unknown argument">
      <code>{name}</code>
      <Button
        onClick={handleClick}
        aria-label={description}
        title={description}
        variant="icon"
        type="button"
      >
        <Trash />
      </Button>
    </li>
  );
}

export function UnknownFormFields({
  unknownArgumentsNames,
  onSettingsChange,
}: Pick<SettingsInputsBuilderProps<FormInfo>, "onSettingsChange"> & {
  unknownArgumentsNames: Array<keyof FormInfo>;
}) {
  // Find unknown arguments and return those too

  if (unknownArgumentsNames.length === 0) return null;

  return (
    <ul className="UnknownFormFields" aria-label="Unknown arguments list">
      {unknownArgumentsNames.map((argName) => (
        <UnknownFieldItem
          key={argName}
          name={argName}
          onRemove={() => onSettingsChange(argName, { type: "REMOVE" })}
        />
      ))}
    </ul>
  );
}
