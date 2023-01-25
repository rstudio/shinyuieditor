import { AiOutlineQuestionCircle } from "react-icons/ai";

import CategoryDivider from "../../components/CategoryDivider";
import type { UiComponentInfo } from "../uiNodeTypes";

import { formatFunctionText } from "./formatFunctionText";
import "./styles.scss";
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
      <div className="unknown-ui-function-settings">
        <div className="SUE-SettingsInput">
          <span className="info-msg">
            <AiOutlineQuestionCircle />
            Unknown function call. Can't modify with visual editor.
          </span>
        </div>
        <CategoryDivider>
          <span>Code</span>
        </CategoryDivider>
        <div className="SUE-SettingsInput">
          <pre className="code-holder">{formatFunctionText(settings.text)}</pre>
        </div>
      </div>
    );
  },
  acceptsChildren: false,
};

export default UnknownUiFunction;
