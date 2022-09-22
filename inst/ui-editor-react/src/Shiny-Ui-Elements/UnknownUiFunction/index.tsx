import CategoryDivider from "components/CategoryDivider";
import { AiOutlineQuestionCircle } from "react-icons/ai";

import type { UiComponentInfo } from "../uiNodeTypes";

import { formatFunctionText } from "./formatFunctionText";
import classes from "./styles.module.css";
import UnknownUiFunction from "./UnknownUiFunction";

export type UnknownUiFunctionProps = {
  text: string;
};

export const unknownUiFunctionInfo: UiComponentInfo<UnknownUiFunctionProps> = {
  title: "Unknown UI Function",
  UiComponent: UnknownUiFunction,
  settingsInfo: {
    text: {
      inputType: "omitted",
      defaultValue: "Unknown Ui Function",
    },
  },
  settingsFormRender: ({ settings }) => {
    return (
      <>
        <div className="SUE-SettingsInput">
          <span className={classes.infoMsg}>
            <AiOutlineQuestionCircle />
            Unknown function call. Can't modify with visual editor.
          </span>
        </div>
        <CategoryDivider>
          <span>Code</span>
        </CategoryDivider>
        <div className="SUE-SettingsInput">
          <pre className={classes.codeHolder}>
            {formatFunctionText(settings.text)}
          </pre>
        </div>
      </>
    );
  },
  acceptsChildren: false,
};

export default UnknownUiFunction;
