import * as React from "react";

import CategoryHeader from "components/CategoryHeader";
import inputClasses from "components/Inputs/Inputs.module.css";
import { AiOutlineQuestionCircle } from "react-icons/ai";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { UnknownUiFunctionProps } from ".";

import classes from "./styles.module.css";

export const UnknownUiFunctionSettings: SettingsUpdaterComponent<
  UnknownUiFunctionProps
> = ({ settings }) => {
  // Split up functions with arguments to format somewhat nicely
  const formattedText = settings.text
    .replaceAll(/\(\s*\)/g, "()")
    .replaceAll(/\((?!\))/g, "(\n  ")
    .replaceAll(/(?<!\()\)/g, "\n)  ")
    .replaceAll(/,/g, ",\n ");
  return (
    <div>
      <div className={inputClasses.container}>
        <span className={classes.infoMsg}>
          <AiOutlineQuestionCircle />
          Unknown function call. Can't modify with visual editor.
        </span>
      </div>
      <CategoryHeader category="Code" />
      <pre className={classes.codeHolder}>{formattedText}</pre>
    </div>
  );
};
