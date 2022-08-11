import * as React from "react";

import CategoryDivider from "components/CategoryDivider";
import inputClasses from "components/Inputs/Inputs.module.css";
import { AiOutlineQuestionCircle } from "react-icons/ai";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { UnknownUiFunctionProps } from ".";

import { formatFunctionText } from "./formatFunctionText";
import classes from "./styles.module.css";

export const UnknownUiFunctionSettings: SettingsUpdaterComponent<
  UnknownUiFunctionProps
> = ({ settings }) => {
  return (
    <div>
      <div className={inputClasses.container}>
        <span className={classes.infoMsg}>
          <AiOutlineQuestionCircle />
          Unknown function call. Can't modify with visual editor.
        </span>
      </div>
      <CategoryDivider category="Code" />
      <div className={inputClasses.container}>
        <pre className={classes.codeHolder}>
          {formatFunctionText(settings.text)}
        </pre>
      </div>
    </div>
  );
};
