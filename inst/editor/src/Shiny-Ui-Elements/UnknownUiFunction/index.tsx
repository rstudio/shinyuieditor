import "./styles.scss";

import { AiOutlineQuestionCircle } from "react-icons/ai";
import { unknown_code } from "ui-node-definitions/src/internal/unknown_code";

import CategoryDivider from "../../components/CategoryDivider";
import { addEditorInfoToUiNode } from "../utils/add_editor_info_to_ui_node";

import { formatFunctionText } from "./formatFunctionText";

const num_preview_chars = 20;

export const unknownUiFunctionInfo = addEditorInfoToUiNode(unknown_code, {
  UiComponent: ({ namedArgs, wrapperProps }) => {
    const functionName =
      namedArgs.text.slice(0, num_preview_chars).replaceAll(/\s$/g, "") + "...";
    return (
      <div className="unknown-ui-function-display" {...wrapperProps}>
        <div>
          unknown ui output: <code>{functionName}</code>
        </div>
      </div>
    );
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
});
