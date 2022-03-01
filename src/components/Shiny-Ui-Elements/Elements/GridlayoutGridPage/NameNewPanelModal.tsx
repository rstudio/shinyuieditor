import React from "react";

import Button from "components/Inputs/Button";
import { TextInput } from "components/Inputs/TextInput";
import PortalModal from "PortalModal";
import classes from "PortalModal.module.css";

import { NewItemInfo } from "./GridlayoutGridPage";

export function NameNewPanelModal({
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

// Old code to validate a grid areas name before allowing submission. Should be
// hooked up to new format const validateName = (name: string) => { const
// elementExists = existingElementNames.includes(name); if (elementExists) {
// setWarningMsg( `You already have an item with the name "${name}", all names
// need to be unique.`
//     );
//     return;
//   }

//   const invalidCharacters = name.match(/^[^a-zA-Z]/g);
//   if (invalidCharacters) {
//     setWarningMsg("Valid item names need to start with a character.");
//     return;
//   }

//   setWarningMsg(null);
// };
