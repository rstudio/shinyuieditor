import { AiOutlineQuestionCircle } from "react-icons/ai";

import CategoryDivider from "../../../components/CategoryDivider";
import { addEditorInfoToUiNode } from "../../utils/add_editor_info_to_ui_node";

import { formatFunctionText } from "./formatFunctionText";
import { unknown_code } from "./unknown_code";

const num_preview_chars = 20;

export const unknownUiFunctionInfo = addEditorInfoToUiNode(unknown_code, {
  UiComponent: ({ namedArgs, wrapperProps }) => {
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
