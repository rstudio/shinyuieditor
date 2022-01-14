import { Button } from "@chakra-ui/react";
import {
  ShinyUiNames,
  UiArgumentsCompByName,
} from "components/Shiny-Ui-Elements/Elements/componentTypes";
import * as React from "react";
import { BiCheck } from "react-icons/bi";
import { SettingsInputsForUi } from "../UiSettings/SettingsInputsForUi";
import { checkIfArgumentsValid } from "./checkIfArgumentsValid";

export function UiSettingsComponent<UiName extends ShinyUiNames>({
  uiName,
  settings,
  onChange,
}: UiArgumentsCompByName<UiName>) {
  const [currentSettings, setCurrentSettings] = React.useState(settings);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  return (
    <div css={{ padding: "1rem" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // Check if valid
          checkIfArgumentsValid({
            state: { uiName, uiArguments: currentSettings },
            onValid: () => onChange(currentSettings),
            onError: setErrorMsg,
          });
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
