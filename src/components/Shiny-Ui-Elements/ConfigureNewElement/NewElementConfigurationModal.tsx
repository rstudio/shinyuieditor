import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ConfigureNewUiPanel } from "components/Shiny-Ui-Elements/ConfigureNewElement/ConfigureNewUiPanel";
import * as React from "react";
import { GridItemExtent } from "utils/gridTemplates/types";

export function NewElementConfigurationModal({
  newPanelPosition,
  existingNames,
  onClose,
}: {
  newPanelPosition: GridItemExtent | null;
  existingNames: string[];
  onClose: () => void;
}) {
  if (newPanelPosition === null) return null;
  return (
    <Modal isOpen={newPanelPosition !== null} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Configure Ui Element</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ConfigureNewUiPanel
            onFinish={({ name, ui }) => {
              console.log({ name, ui });
            }}
            onCancel={onClose}
            existingElementNames={existingNames}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
