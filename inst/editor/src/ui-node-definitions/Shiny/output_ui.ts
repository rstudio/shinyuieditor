import { nodeInfoFactory } from "../nodeInfoFactory";

export const output_ui = nodeInfoFactory<{
  outputId: string;
}>()({
  id: "uiOutput",
  r_info: {
    fn_name: "uiOutput",
    package: "shiny",
    output_bindings: {
      renderScaffold: {
        fn_name: "renderUI",
        fn_body: `h1("Hello, World")`,
      },
    },
  },
  py_info: {
    fn_name: "ui.output_ui",
    package: "shiny",
    output_bindings: {
      renderScaffold: {
        fn_name: "@render.ui",
        fn_body: `ui.h1("Hello, World")`,
      },
    },
  },
  title: "Dynamic UI Output",
  takesChildren: false,
  settingsInfo: {
    outputId: {
      inputType: "id",
      label: "Output ID",
      defaultValue: "dynamicUiOutput",
    },
  },
  category: "Outputs",
  description: `
  Render a reactive output variable as HTML within an application page. 
  The text will be included within an HTML \`div\` tag, and is presumed to 
  contain HTML content which should not be escaped.
  `,
});
