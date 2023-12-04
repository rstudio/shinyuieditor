import { NodeWrapper } from "../../../components/UiNode/NodeWraper";
import uiIcon from "../../assets/icons/shinyTextOutput.png";
import { nodeInfoFactory } from "../../nodeInfoFactory";

export const output_text = nodeInfoFactory<{
  outputId: string;
}>()({
  id: "textOutput",
  r_info: {
    fn_name: "textOutput",
    package: "shiny",
    output_bindings: {
      renderScaffold: {
        fn_name: "renderText",
        fn_body: `"Hello, World"`,
      },
    },
  },
  py_info: {
    fn_name: "ui.output_text",
    package: "shiny",
    output_bindings: {
      renderScaffold: {
        fn_name: "@render.text",
        fn_body: `"Hello, World"`,
      },
    },
  },
  title: "Text Output",
  takesChildren: false,
  settingsInfo: {
    outputId: {
      inputType: "id",
      label: "Output ID",
      defaultValue: "textOutput",
    },
  },
  category: "Outputs",
  description: `
  Render a reactive output variable as text within an application page. 
  Usually paired with \`renderText()\`.
  `,
  iconSrc: uiIcon,
  ui_component: ({ namedArgs, wrapperProps }) => {
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
