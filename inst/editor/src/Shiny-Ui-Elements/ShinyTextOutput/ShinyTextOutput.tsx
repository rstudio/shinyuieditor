import uiIcon from "../../assets/icons/shinyTextOutput.png";
import { NodeWrapper } from "../../components/UiNode/NodeWraper";
import { output_text } from "../../ui-node-definitions/Shiny/output_text";
import { addEditorInfoToUiNode } from "../utils/add_editor_info_to_ui_node";

export const shinyTextOutputInfo = addEditorInfoToUiNode(output_text, {
  iconSrc: uiIcon,
  UiComponent: ({ namedArgs, wrapperProps }) => {
    return (
      <NodeWrapper
        wrapperProps={wrapperProps}
        className="bg-light-grey rounded p-2 text-black max-h-full"
      >
        Dynamic text from <code>output${namedArgs.outputId}</code>
      </NodeWrapper>
    );
  },
});
