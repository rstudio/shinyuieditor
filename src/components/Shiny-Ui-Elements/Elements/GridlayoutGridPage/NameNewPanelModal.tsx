import { TextInput } from "components/Inputs/TextInput";
import PortalModal from "PortalModal";
import React from "react";
import { NewItemInfo } from "./index";
import classes from "PortalModal.module.css";
import Button from "components/Inputs/Button";

export function NameNewPanelModal({
  info: { uiName, pos },
  onCancel,
  onDone,
}: {
  info: NewItemInfo;
  onCancel: () => void;
  onDone: (name: string) => void;
}) {
  const [newItemName, setNewItemName] = React.useState<string>(
    "NewGridItemFromPortal"
  );

  return (
    <PortalModal
      title="Adding new grid area"
      onConfirm={() => onDone(newItemName)}
      onCancel={onCancel}
    >
      <form
        className={classes.portalForm}
        onSubmit={(e) => {
          e.preventDefault();
          onDone(newItemName);
        }}
      >
        <div className={classes.portalFormInputs}>
          <TextInput
            label="Name of new grid area"
            name="New-Item-Name"
            value={newItemName}
            onChange={setNewItemName}
            autoFocus={true}
          />
        </div>
        <div className={classes.portalFormFooter}>
          <Button variant="delete">Cancel</Button>
          <Button onClick={() => onDone(newItemName)}>Done</Button>
        </div>
      </form>
    </PortalModal>
  );
}
