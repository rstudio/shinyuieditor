import { setup_r_parser } from "treesitter-parsers";

import { parse_r_script } from "./parse_r_script";
import { r_treesitter_to_ui_tree } from "./r_treesitter_to_ui_tree";

describe("Can go from treesitter to UI tree", async () => {
  const my_parser = await setup_r_parser();
  test("Nodes with ui nodes as named arguments work", () => {
    const parse_test = parse_r_script(
      my_parser,
      `value_box(
        title = "Look at me!",
        value = "Big number with more",
        showcase = bsicons::bs_icon("database")
      )`
    ).rootNode;

    const parsed_node = r_treesitter_to_ui_tree(parse_test.firstNamedChild!);

    expect(parsed_node.id).toEqual("value_box");

    expect(parsed_node.namedArgs).toEqual(
      expect.objectContaining({
        title: "Look at me!",
        showcase_icon: "database",
        value: {
          id: "textNode",
          namedArgs: {
            contents: "Big number with more",
          },
        },
      })
    );
  });
});
