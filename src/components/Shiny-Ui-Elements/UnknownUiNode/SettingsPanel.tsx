import * as React from "react";

import { SectionLabel } from "components/Inputs/InputSections";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { UnknownUiFunctionProps } from ".";

import classes from "./styles.module.css";

export const UnknownUiFunctionSettings: SettingsUpdaterComponent<
  UnknownUiFunctionProps
> = ({ settings }) => {
  return (
    <div>
      Unknown function call. Can't modify with visual editor.
      <SectionLabel name="Code" />
      <div style={{ marginTop: "6px" }} className={classes.codeHolder}>
        {settings.text}
      </div>
    </div>
  );
};
