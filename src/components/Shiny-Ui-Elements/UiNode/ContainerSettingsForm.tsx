import { Button } from "@chakra-ui/react";
import React from "react";
import { BiCheck } from "react-icons/bi";
import { ContainerSettings } from "../uiNodeTypes";
import classes from "./ContainerSettingsForm.module.css";

export function ContainerSettingsForm({
  settings,
  onChange,
}: {
  settings: ContainerSettings;
  onChange: (newSettings: object) => void;
}) {
  const [verticalAlign, setVerticalAlign] = React.useState(
    settings.verticalAlign
  );
  const [horizontalAlign, setHorizontalAlign] = React.useState(
    settings.horizontalAlign
  );

  const currentSettings: ContainerSettings = {
    verticalAlign,
    horizontalAlign,
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onChange(currentSettings);
        }}
      >
        <div className={classes.formSection}>
          <p>Vertical Alignment:</p>
          <fieldset
            className={classes.radioInputs}
            onChange={(e) => {
              setVerticalAlign(
                (e.target as HTMLInputElement)
                  .value as ContainerSettings["verticalAlign"]
              );
            }}
          >
            {["top", "center", "bottom"].map((dir) => (
              <div key={dir}>
                <input
                  name="vertical-alignment"
                  type="radio"
                  value={dir}
                  defaultChecked={dir === verticalAlign}
                  // on
                />
                <label htmlFor={dir}>{dir}</label>
              </div>
            ))}
          </fieldset>
        </div>
        <div className={classes.formSection}>
          <p>Horizontal Alignment:</p>
          <fieldset
            className={classes.radioInputs}
            onChange={(e) => {
              setHorizontalAlign(
                (e.target as HTMLInputElement)
                  .value as ContainerSettings["horizontalAlign"]
              );
            }}
          >
            {["left", "center", "right"].map((dir) => (
              <div key={dir}>
                <input
                  name="horizontal-alignment"
                  type="radio"
                  value={dir}
                  defaultChecked={dir === horizontalAlign}
                />
                <label htmlFor={dir}>{dir}</label>
              </div>
            ))}
          </fieldset>
        </div>
        <div>
          <Button
            variant="main"
            leftIcon={<BiCheck />}
            marginTop="0.75rem"
            type="submit"
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
