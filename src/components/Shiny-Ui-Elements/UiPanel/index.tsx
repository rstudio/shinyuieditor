import { IconButton } from "@chakra-ui/button";
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/popover";
import { Button } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type {
  ShinyUiNames,
  ShinyUiArgumentsByName,
  UiArgumentsCompByName,
  ShinyUiNameAndArguments,
} from "components/Shiny-Ui-Elements/Elements/componentTypes";
import * as React from "react";
import { BiCheck } from "react-icons/bi";
import {
  FiSettings as SettingsIcon,
  FiTrash as TrashIcon,
} from "react-icons/fi";
import { makeBoxShadow } from "utils/css-helpers";
import { uiComponentAndSettings } from "../Elements/uiComponentAndSettings";
import { SettingsInputsForUi } from "../UiSettings/SettingsInputsForUi";

function UiComponent<UiName extends ShinyUiNames>({
  uiName,
  settings,
}: {
  uiName: UiName;
  settings: ShinyUiArgumentsByName[UiName];
}) {
  const Comp = uiComponentAndSettings[uiName].UiComponent;
  return <Comp {...settings} />;
}

type ValidateArgsResponse =
  | {
      type: "valid";
      html: string;
    }
  | { type: "error"; error_msg: string };

function checkIfArgumentsValid({
  state,
  onValid,
  onError,
}: {
  state: ShinyUiNameAndArguments;
  onValid: (x?: string) => void;
  onError: (x: string) => void;
}) {
  const stateBlob = new Blob([JSON.stringify(state, null, 2)], {
    type: "application/json",
  });
  console.log("Sending arguments to server for validation", state);

  fetch("ValidateArgs", { method: "POST", body: stateBlob })
    .then(function (response) {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(function (response) {
      const r = response as ValidateArgsResponse;
      if (r.type === "valid") {
        onValid();
      }
      if (r.type === "error") {
        onError(r.error_msg);
      }
    });
}

function UiSettingsComponent<UiName extends ShinyUiNames>({
  uiName,
  settings,
  onChange,
}: UiArgumentsCompByName<UiName>) {
  const [currentSettings, setCurrentSettings] = React.useState(settings);
  const [settingsAreValid, setSettingsAreValid] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  return (
    <div css={{ padding: "1rem" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // Check if valid
          checkIfArgumentsValid({
            state: { uiName, uiArguments: currentSettings },
            onValid: () => onChange(currentSettings, true),
            onError: setErrorMsg,
          });
        }}
      >
        <SettingsInputsForUi
          uiName={uiName}
          settings={currentSettings}
          onChange={(settings, isValid) => {
            setCurrentSettings(settings);
            setSettingsAreValid(isValid);
          }}
        />
        {errorMsg ? (
          <div>
            Input settings are not valid. The following errors were received:
            <ErrorMsg>{errorMsg}</ErrorMsg>
          </div>
        ) : null}
        <Button
          variant="main"
          leftIcon={<BiCheck />}
          marginTop="0.75rem"
          type="submit"
          disabled={!settingsAreValid}
        >
          Update
        </Button>
      </form>
    </div>
  );
}

function UiPanel<ElName extends ShinyUiNames>({
  area,
  componentDefinition,
  onUpdate,
  onDelete,
}: {
  area: string;
  componentDefinition: {
    uiName: ElName;
    uiArguments: ShinyUiArgumentsByName[ElName];
  };
  onUpdate?: (newProps: ShinyUiArgumentsByName[ElName]) => void;
  onDelete?: () => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const openPopover = () => setIsOpen(!isOpen);
  const closePopover = () => setIsOpen(false);

  const { uiName: name, uiArguments: settings } = componentDefinition;

  return (
    <UiPanelHolder
      aria-label={`${area} panel with ${name}`}
      className="ui-panel-holder"
      area={area}
    >
      <IconButton
        aria-label="Delete panel"
        size="sm"
        variant="ghost"
        icon={<TrashIcon />}
        style={{ left: 0 }}
        css={actionButtonStyles}
        onClick={onDelete}
      />
      <Popover
        isOpen={isOpen}
        onClose={closePopover}
        onOpen={openPopover}
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="Open settings dialog"
            icon={<SettingsIcon />}
            style={{ right: 0 }}
            css={actionButtonStyles}
          />
        </PopoverTrigger>
        <PopoverContent aria-label={`Settings for ${name}`}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>
            <code>{name}</code> settings
          </PopoverHeader>
          <PopoverBody>
            <UiSettingsComponent
              uiName={name}
              settings={settings}
              onChange={(newSettings) => {
                onUpdate?.(newSettings);
                closePopover();
              }}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <UiComponent uiName={name} settings={settings} />
    </UiPanelHolder>
  );
}

export const UiPanelHolder = styled.div(({ area }: { area?: string }) => ({
  display: "grid",
  gridArea: area,
  gridTemplateRows: "1fr",
  gridTemplateColumns: "1fr",
  width: "100%",
  height: "100%",
  placeItems: "center",
  position: "relative",
  backgroundColor: "var(--rstudio-white, forestgreen)",
  boxShadow: makeBoxShadow({ height: 0.2 }),
}));

const actionButtonStyles = css({
  position: "absolute",
  top: 0,
  opacity: 0.5,
});

const ErrorMsg = styled.pre({
  color: "orangered",
});
export default UiPanel;
