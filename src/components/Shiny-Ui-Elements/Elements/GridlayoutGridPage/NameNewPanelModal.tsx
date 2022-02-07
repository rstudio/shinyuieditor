import { TextInput } from "components/Inputs/TextInput";
import PortalModal from "PortalModal";
import React from "react";
import { NewItemInfo } from "./index";

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
      <TextInput
        label="Name of new grid area"
        name="New-Item-Name"
        value={newItemName}
        onChange={setNewItemName}
        autoFocus={true}
      />
    </PortalModal>
  );
}
