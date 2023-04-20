import { nodeInfoFactory } from "../nodeInfoFactory";

export const output_ui = nodeInfoFactory<{
  outputId: string;
}>()({
  id: "uiOutput",
  r_info: {
    fn_name: "uiOutput",
    package: "shiny",
  },
  title: "Dynamic UI Output",
  takesChildren: false,
  settingsInfo: {
    outputId: {
      label: "Output ID",
      inputType: "string",
      defaultValue: "dynamicUiOutput",
    },
  },
  serverBindings: {
    outputs: {
      outputIdKey: "outputId",
      renderScaffold: `renderUI({\n  h1("Hello, World")\n})`,
    },
  },
  category: "Outputs",
  description: `
  Render a reactive output variable as HTML within an application page. 
  The text will be included within an HTML \`div\` tag, and is presumed to 
  contain HTML content which should not be escaped.
  `,
});
