import { setup_python_parser } from "python-ts-parser";
import type { KnownShinyUiNode } from "ui-node-definitions/src/uiNodeTypes";

import { parse_python_script, treesitter_to_ui_tree } from ".";

import { get_assignment_nodes } from "./get_assignment_nodes";

export const basicNavbarPage = {
  id: "navbarPage",
  namedArgs: {
    title: "My Navbar Page",
    collapsible: false,
  },
  children: [
    {
      id: "tabPanel",
      namedArgs: {
        title: "Settings",
      },
      children: [
        {
          id: "sliderInput",
          namedArgs: {
            inputId: "inputId",
            label: "Slider Input",
            min: 0,
            max: 10,
            value: 5,
            width: "100%",
          },
        },
      ],
    },
    {
      id: "tabPanel",
      namedArgs: {
        title: "Plot 1",
      },
      children: [
        {
          id: "plotOutput",
          namedArgs: {
            outputId: "MyPlot",
            width: "100%",
            height: "100%",
          },
        },
      ],
    },
  ],
} satisfies KnownShinyUiNode;

describe("Can go from parsed-tree-sitter ast to proper ShinyUiNode", async () => {
  const parser = await setup_python_parser();

  test("Simple slider input with all named args", () => {
    const sliderInputDef = `
my_slider = ui.input_slider(
  id = "inputId",
  label = "Slider Input",
  min = 0,
  max = 10,
  value = 5.5,
  width = "100%"
)
`;

    const assigned_nodes = get_assignment_nodes(
      parse_python_script(parser, sliderInputDef)
    );

    const slider_node = assigned_nodes.get("my_slider");

    expect(slider_node).not.toBeUndefined();

    const converted_node = treesitter_to_ui_tree(slider_node!);

    expect(converted_node).toStrictEqual({
      id: "sliderInput",
      namedArgs: {
        inputId: "inputId",
        label: "Slider Input",
        min: 0,
        max: 10,
        value: 5.5,
        width: "100%",
      },
    });
  });

  test("Can handle call with positional named argument", () => {
    const navDef = `
    my_nav = ui.nav(
      "Plot 1",
      ui.output_plot(id = "MyPlot")
    )
    `;
    const assigned_nodes = get_assignment_nodes(
      parse_python_script(parser, navDef)
    );

    const nav_node = assigned_nodes.get("my_nav");

    expect(nav_node).not.toBeUndefined();

    const converted_node = treesitter_to_ui_tree(nav_node!);

    expect(converted_node).toStrictEqual({
      id: "tabPanel",
      namedArgs: {
        title: "Plot 1",
      },
      children: [
        {
          id: "plotOutput",
          namedArgs: {
            outputId: "MyPlot",
          },
        },
      ],
    });
  });

  test("Handle when a leaf node has all its argument passed positionally", () => {
    const nodeCode = `my_node =  ui.input_slider("n", "N", 0, 100, 20)`;
    const assigned_nodes = get_assignment_nodes(
      parse_python_script(parser, nodeCode)
    );

    const converted_node = treesitter_to_ui_tree(
      assigned_nodes.get("my_node")!
    );
    expect(converted_node).toStrictEqual({
      id: "sliderInput",
      namedArgs: {
        inputId: "n",
        label: "N",
        min: 0,
        max: 100,
        value: 20,
      },
    });
  });
  // const ui_node = get_ui_assignment(
  //   get_assignment_nodes(parse_python_script(navbar_page_app))
  // );

  // if (!ui_node) {
  //   throw new Error("ui_node is null");
  // }

  // const parsed_navbar_page_app = ts_node_to_ui_tree(ui_node);
  // expect(parsed_navbar_page_app).toStrictEqual(basicNavbarPage);
});
