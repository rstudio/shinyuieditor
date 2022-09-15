import { Trash } from "components/Icons";

import Button from "../Button/Button";

import type { SettingsInfo } from "./ArgumentInfo";
import type { SettingsInputsBuilderProps } from "./SettingsFormBuilder";

function UnknownArgumentItem({
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
    <li aria-label="Unkown argument">
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

export function UnknownArgumentItems({
  unknownArgumentsNames,
  onSettingsChange,
}: Pick<SettingsInputsBuilderProps<SettingsInfo>, "onSettingsChange"> & {
  unknownArgumentsNames: Array<keyof SettingsInfo>;
}) {
  // Find unknown arguments and return those too

  if (unknownArgumentsNames.length === 0) return null;

  return (
    <ul className="UnknownArgumentsList" aria-label="Unknown arguments list">
      {unknownArgumentsNames.map((argName) => (
        <UnknownArgumentItem
          key={argName}
          name={argName}
          onRemove={() => onSettingsChange(argName, { type: "REMOVE" })}
        />
      ))}
    </ul>
  );
}
