import React from "react";

import Button from "components/Inputs/Button";
import { TextInput } from "components/Inputs/TextInput";
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
  const [newItemName, setNewItemName] = React.useState<string>("");

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

  const handleNameUpdate = React.useCallback((newName) => {
    // Reset the warning message (if it exists) when the user types so stale
    // warnings dont linger.
    setWarningMsg(null);
    setNewItemName(newName);
  }, []);

  return (
    <PortalModal
      title="Adding new grid area"
      onConfirm={() => onDone(newItemName)}
      onCancel={onCancel}
    >
      <form className={classes.portalForm} onSubmit={handleSubmit}>
        <div className={classes.portalFormInputs}>
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
        <div className={classes.portalFormFooter}>
          <Button variant="delete">Cancel</Button>
          <Button onClick={() => handleSubmit()}>Done</Button>
        </div>
      </form>
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

  return null;
}
