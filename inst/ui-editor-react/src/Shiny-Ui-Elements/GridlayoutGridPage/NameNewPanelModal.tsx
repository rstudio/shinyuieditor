import React from "react";

import Button from "components/Inputs/Button/Button";
import { TextInput } from "components/Inputs/TextInput/TextInput";
import PortalModal from "PortalModal";
import classes from "PortalModal.module.css";

import type { NewItemInfo } from "./GridlayoutGridPage";

export function NameNewPanelModal({
  onCancel,
  onDone,
  existingAreaNames,
}: {
  info: NewItemInfo;
  onCancel: () => void;
  onDone: (name: string) => void;
  existingAreaNames: string[];
}) {
  const defaultName = `area${existingAreaNames.length}`;
  const [newItemName, setNewItemName] = React.useState<string>(defaultName);

  const [warningMsg, setWarningMsg] = React.useState<string | null>(null);

  const handleSubmit = React.useCallback(
    (e?: React.FormEvent<HTMLFormElement>) => {
      if (e) {
        e.preventDefault();
      }

      const validationError = validateGridAreaName({
        name: newItemName,
        existingAreaNames,
      });

      if (validationError) {
        setWarningMsg(validationError);
        return;
      }
      onDone(newItemName);
    },
    [existingAreaNames, newItemName, onDone]
  );

  const handleNameUpdate = React.useCallback(
    ({ value: newName }: { value?: string }) => {
      // Reset the warning message (if it exists) when the user types so stale
      // warnings dont linger.
      setWarningMsg(null);
      setNewItemName(newName ?? defaultName);
    },
    [defaultName]
  );

  return (
    <PortalModal
      title="Name new grid area"
      label="New grid area naming modal"
      onConfirm={() => onDone(newItemName)}
      onCancel={onCancel}
    >
      <form className={classes.portalForm} onSubmit={handleSubmit}>
        <div className={classes.portalFormInputs}>
          <span className={classes.infoText}>
            Name for grid area needs to be unique, start with a letter, and
            contain only letters and numbers.
          </span>
          <TextInput
            label="Name of new grid area"
            name="New-Item-Name"
            value={newItemName}
            placeholder="Name of grid area"
            onChange={handleNameUpdate}
            autoFocus={true}
          />
          {warningMsg ? (
            <div className={classes.validationMsg}>{warningMsg}</div>
          ) : null}
        </div>
      </form>
      <div className={classes.portalFormFooter}>
        <Button variant="delete" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => handleSubmit()}>Done</Button>
      </div>
    </PortalModal>
  );
}

function validateGridAreaName({
  name,
  existingAreaNames,
}: {
  name: string;
  existingAreaNames: string[];
}) {
  if (name === "") {
    return "A name is needed for the grid area";
  }

  const elementExists = existingAreaNames.includes(name);
  if (elementExists) {
    return `You already have an item with the name "${name}", all names
  need to be unique.`;
  }

  const invalidCharacters = name.match(/^[^a-zA-Z]/g);
  if (invalidCharacters) {
    return "Valid item names need to start with a character.";
  }

  const hasSpaces = name.match(/\s/g);
  if (hasSpaces) {
    return "Spaces not allowed in grid area names";
  }

  const hasSpecialCharacters = name.match(/[^\w]/g);
  if (hasSpecialCharacters) {
    return "Only letters and numbers allowed in area names";
  }

  return null;
}
