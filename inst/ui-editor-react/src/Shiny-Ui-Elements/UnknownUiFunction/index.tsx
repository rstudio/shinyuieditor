import inputClasses from "components/Inputs/Inputs.module.css";
import { AiOutlineQuestionCircle } from "react-icons/ai";

import type { UiComponentInfo } from "../uiNodeTypes";

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
  settingsFormRender: ({ inputs }) => {
    return (
      <div className={inputClasses.container}>
        <span className={classes.infoMsg}>
          <AiOutlineQuestionCircle />
          Unknown function call. Can't modify with visual editor.
        </span>
      </div>
    );
  },
  acceptsChildren: false,
};

export default UnknownUiFunction;
