import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import * as React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import { ShinyUiNameAndArguments } from "../uiNodeTypes";
import { SettingsInputsForUi } from "../UiSettings/SettingsInputsForUi";
import { UiOptionsList } from "./UiOptionsList";

export default function ConfigureNewUiElement({
  onFinish,
  onCancel,
  existingElementNames,
}: {
  onFinish: (opts: { name: string; ui: ShinyUiNameAndArguments }) => void;
  onCancel: () => void;
  existingElementNames: string[];
}) {
  const nameInputRef = React.useRef<HTMLInputElement>(null);

  const [currentName, setCurrentName] = React.useState("");
  const [currentUi, setCurrentUi] =
    React.useState<ShinyUiNameAndArguments | null>(null);
  // Default to having settings be valid because we're suppliying the default
  // values and thus they will be good.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [uiSettingsAreValid, setUiSettingsAreValid] =
    React.useState<boolean>(true);
  const [warningMsg, setWarningMsg] = React.useState<string | null>(null);
  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentName(e.target.value);
    validateName(e.target.value);
  };

  // Make sure TS knows these are compatible types

  // Make sure when the modal pops up focus is on the input so the user can
  // start typing immediately without having to select then input with mouse.
  React.useLayoutEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const validateName = (name: string) => {
    const elementExists = existingElementNames.includes(name);
    if (elementExists) {
      setWarningMsg(
        `You already have an item with the name "${name}", all names need to be unique.`
      );
      return;
    }

    const invalidCharacters = name.match(/^[^a-zA-Z]/g);
    if (invalidCharacters) {
      setWarningMsg("Valid item names need to start with a character.");
      return;
    }

    setWarningMsg(null);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentName === "" || currentUi === null) return;

    onFinish({ name: currentName, ui: currentUi });
  };

  const hasWarning = Boolean(warningMsg);

  return (
    <form onSubmit={onSubmit} aria-label="Configure new UI Element">
      <VerticalStack>
        <FormControl id="item-name" isRequired>
          <FormLabel>Grid Area Name</FormLabel>
          <Input
            ref={nameInputRef}
            placeholder="Item Name"
            value={currentName}
            onChange={updateName}
            isInvalid={hasWarning}
          />

          <FormHelperText
            color={hasWarning ? "orangered" : "GrayText"}
            aria-label={hasWarning ? "input-warning" : "input-description"}
          >
            {hasWarning
              ? warningMsg
              : "Name of the grid region containing UI. Used to map to placement on grid."}
          </FormHelperText>
        </FormControl>

        <hr />

        <FormControl id="ui-chooser" isRequired>
          <FormLabel>UI Element</FormLabel>
          <UiOptionsList onChoose={setCurrentUi} selected={currentUi?.uiName} />

          <FormHelperText color="GrayText" aria-label="input-description">
            The type of UI element you want to add
          </FormHelperText>
        </FormControl>

        {/* Render the form for a given component settings if a ui element is selected */}
        {currentUi ? (
          <FormControl id="ui-settings">
            <FormLabel>Settings for {currentUi.uiName}</FormLabel>

            <div style={{ paddingLeft: "1.5rem" }}>
              <SettingsInputsForUi
                uiName={currentUi.uiName}
                settings={currentUi.uiArguments}
                onChange={(newSettings) => {
                  setCurrentUi({
                    uiName: currentUi.uiName,
                    uiArguments: newSettings,
                  } as ShinyUiNameAndArguments);
                }}
              />
            </div>

            <FormHelperText color="GrayText" aria-label="input-description">
              Configure chosen UI element.
            </FormHelperText>
          </FormControl>
        ) : (
          <span style={{ fontStyle: "italic" }}>
            Select a UI element to adjust settings...
          </span>
        )}

        <HStack spacing="6" marginTop="1rem" justify="space-evenly">
          <Button
            variant="main"
            leftIcon={<BiCheck />}
            type="submit"
            disabled={
              currentName === "" ||
              currentUi === null ||
              warningMsg !== null ||
              !uiSettingsAreValid
            }
          >
            Add Item
          </Button>
          <Button
            colorScheme="red"
            leftIcon={<AiOutlineClose />}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </HStack>
      </VerticalStack>
    </form>
  );
}

const VerticalStack = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});
