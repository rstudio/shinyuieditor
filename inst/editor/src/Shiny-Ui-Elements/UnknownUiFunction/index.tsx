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
  return "text" in node.namedArgs && node.id === "unknownUiFunction";
}

export const unknownUiFunctionInfo = nodeInfoFactory<UnknownUiFunctionProps>()({
  r_fn_name: "unknownUiFunction",
  r_package: "Internal",
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

/**
 * Generate a node for an unknown UI function from text.
 * @param text The text of the function call
 * @param explanation An optional explanation of why the function is unknown
 * @returns A node for the unknown UI function
 */
export function make_unknown_ui_function(text: string, explanation?: string) {
  return {
    id: "unknownUiFunction",
    namedArgs: {
      text,
      explanation,
    },
  };
}

export default UnknownUiFunction;
