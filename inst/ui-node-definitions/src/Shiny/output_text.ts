import { nodeInfoFactory } from "../nodeInfoFactory";

export const output_text = nodeInfoFactory<{
  outputId: string;
}>()({
  id: "textOutput",
  r_info: {
    fn_name: "textOutput",
    package: "shiny",
    output_bindings: {
      outputIdKey: "outputId",
      renderScaffold: `renderText({\n  "Hello, World"\n})`,
    },
  },
  title: "Text Output",
  takesChildren: false,
  settingsInfo: {
    outputId: {
      label: "Output ID",
      inputType: "string",
      defaultValue: "textOutput",
    },
  },
  category: "Outputs",
  description: `
  Render a reactive output variable as text within an application page. 
  Usually paired with \`renderText()\`.
  `,
});
