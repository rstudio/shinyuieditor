import { ShinyUiNameAndArguments } from "components/Shiny-Ui-Elements/Elements/componentTypes";
import * as React from "react";
import { SettingsPopover } from "../../SettingsPopover";
import { UiComponent } from "./UiComponent";
import { UiSettingsComponent } from "./UiSettingsComponent";

export function UiElement({
  uiDef,
  onUpdate,
  onDelete,
}: {
  uiDef: ShinyUiNameAndArguments;
  onUpdate?: (newProps: object) => void;
  onDelete?: () => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <SettingsPopover
        name={uiDef.uiName}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onDelete={onDelete}
      >
        <UiSettingsComponent
          {...uiDef}
          onChange={(newSettings) => {
            onUpdate?.(newSettings);
            setIsOpen(false);
          }}
        />
      </SettingsPopover>

      <UiComponent {...uiDef} />
    </>
  );
}
