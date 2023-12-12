import uiIcon from "../../../assets/icons/shinyImage.png";
import { nodeInfoFactory } from "../../nodeInfoFactory";

import classes from "./styles.module.css";

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
  iconSrc: uiIcon,
  category: "Outputs",
  description: `
  Render a reactive output variable as HTML within an application page. 
  The text will be included within an HTML \`div\` tag, and is presumed to 
  contain HTML content which should not be escaped.
  `,
  ui_component: ({ namedArgs, wrapperProps }) => {
    const { outputId = "shiny-ui-output" } = namedArgs;

    return (
      <div className={classes.container} {...wrapperProps}>
        <div style={{ gridArea: "1/1", placeSelf: "center" }}>
          This is a a dynamic UI Output {outputId}!
        </div>
      </div>
    );
  },
});
