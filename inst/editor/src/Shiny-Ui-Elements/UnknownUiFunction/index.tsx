import { AiOutlineQuestionCircle } from "react-icons/ai";

import CategoryDivider from "../../components/CategoryDivider";
import { nodeInfoFactory } from "../nodeInfoFactory";
import type { MakeShinyUiNode, ShinyUiNode } from "../uiNodeTypes";

import { formatFunctionText } from "./formatFunctionText";
import "./styles.scss";
import UnknownUiFunction from "./UnknownUiFunction";

export type UnknownUiFunctionProps = {
  text: string;
  explanation?: string;
};
export type UnknownUiNode = MakeShinyUiNode<UnknownUiFunctionProps>;

export function isUnknownUiNode(node: ShinyUiNode): node is UnknownUiNode {
  return "text" in node.uiArguments && node.id === "unknownUiFunction";
}

export const unknownUiFunctionInfo = nodeInfoFactory<UnknownUiFunctionProps>()({
  name: "unknownUiFunction",
  title: "Unknown UI Function",
  takesChildren: false,
  UiComponent: UnknownUiFunction,
  settingsInfo: {
    text: {
      inputType: "omitted",
      defaultValue: "Unknown Ui Function",
    },
    explanation: { inputType: "omitted", optional: true },
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
export default UnknownUiFunction;
