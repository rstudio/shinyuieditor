import { Button } from "@chakra-ui/react";
import {
  ShinyUiArguments,
  ShinyUiNameAndArguments,
  ShinyUiNames,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import * as React from "react";
import { BiCheck } from "react-icons/bi";
import { SettingsInputsForUi } from "../UiSettings/SettingsInputsForUi";
import { checkIfArgumentsValid } from "./checkIfArgumentsValid";

type UiSettingsComponentProps = {
  [UiName in ShinyUiNames]: {
    uiName: UiName;
    uiArguments: ShinyUiArguments[UiName];
    // Using object type here because I can't get narrowing to work properly inside UiSettingsComponent()
    onChange: (newSettings: object) => void;
  };
}[ShinyUiNames];

export function UiSettingsComponent({
  uiName,
  uiArguments,
  onChange,
  checkValid = true,
}: UiSettingsComponentProps & { checkValid?: boolean }) {
  const [currentSettings, setCurrentSettings] = React.useState(uiArguments);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const currentState = {
    uiName,
    uiArguments: currentSettings,
  } as ShinyUiNameAndArguments;

  return (
    <div css={{ padding: "1rem" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // Check if valid
          if (checkValid) {
            checkIfArgumentsValid({
              state: currentState,
              onValid: () => onChange(currentState.uiArguments),
              onError: setErrorMsg,
            });
          } else {
            onChange(currentState.uiArguments);
          }
        }}
      >
        <SettingsInputsForUi
          uiName={uiName}
          settings={currentSettings}
          onChange={(settings) => {
            setCurrentSettings(settings);
          }}
        />
        {errorMsg ? (
          <div>
            Input settings are not valid. The following errors were received:
            <pre style={{ color: "orangered" }}>{errorMsg}</pre>
          </div>
        ) : null}
        <Button
          variant="main"
          leftIcon={<BiCheck />}
          marginTop="0.75rem"
          type="submit"
        >
          Update
        </Button>
      </form>
    </div>
  );
}
