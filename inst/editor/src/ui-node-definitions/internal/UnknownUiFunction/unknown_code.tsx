import { AiOutlineQuestionCircle } from "react-icons/ai";

import CategoryDivider from "../../../components/CategoryDivider";
import { nodeInfoFactory } from "../../nodeInfoFactory";
import type { MakeShinyUiNode, ShinyUiNode } from "../../ShinyUiNode";

import { formatFunctionText } from "./formatFunctionText";

type UnknownUiFunctionProps = {
  text: string;
  explanation?: string;
};
export type UnknownUiNode = MakeShinyUiNode<UnknownUiFunctionProps>;

export function isUnknownUiNode(node: ShinyUiNode): node is UnknownUiNode {
  return "text" in node.namedArgs && node.id === "unknownUiFunction";
}
const num_preview_chars = 20;

export const unknown_code = nodeInfoFactory<UnknownUiFunctionProps>()({
  id: "unknownUiFunction",
  r_info: {
    fn_name: "unknownUiFunction",
    package: "Internal",
  },
  title: "Unknown UI Function",
  takesChildren: false,
  settingsInfo: {
    text: {
      inputType: "omitted",
      defaultValue: "Unknown Ui Function",
    },
    explanation: { inputType: "omitted", optional: true },
  },
  ui_component: ({ namedArgs, wrapperProps }) => {
    const functionName =
      namedArgs.text.slice(0, num_preview_chars).replaceAll(/\s$/g, "") + "...";
    return (
      <div
        className="my-2 grid place-content-center rounded-standard relative min-w-0 "
        {...wrapperProps}
      >
        <div>unknown ui output:</div>
        <code className="block bg-light-grey font-mono overflow-hidden text-elipses whitespace-nowrap border shadow-inner p-1">
          {functionName}
        </code>
      </div>
    );
  },
  settingsFormRender: ({ settings }) => {
    return (
      <div>
        <div className="SUE-SettingsInput">
          <span>
            <AiOutlineQuestionCircle className="text-rstudio-blue mr-1 mb-[0.12rem]" />
            Unknown function call. Can't modify with visual editor.
          </span>
        </div>
        <CategoryDivider>
          <span>Code</span>
        </CategoryDivider>
        <div className="SUE-SettingsInput">
          <pre className=" bg-white overflow-auto font-mono border border-rstudio-grey p-1">
            {formatFunctionText(settings.text)}
          </pre>
        </div>
      </div>
    );
  },
});
