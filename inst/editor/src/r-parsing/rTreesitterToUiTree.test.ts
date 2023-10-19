import { setup_r_parser } from "treesitter-parsers";

import { parseRScript } from "./parseRScript";
import { rTreesitterToUiTree } from "./rTreesitterToUiTree";

describe("Can go from treesitter to UI tree", async () => {
  const my_parser = await setup_r_parser();
  test("Nodes with ui nodes as named arguments work", () => {
    const parse_test = parseRScript(
      my_parser,
      `value_box(
        title = "Look at me!",
        value = "Big number with more",
        showcase = bsicons::bs_icon("database")
      )`
    ).rootNode;

    const parsed_node = rTreesitterToUiTree(parse_test.firstNamedChild!);

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

  test("Can remap new api's automatically", () => {
    const parse_test = parseRScript(
      my_parser,
      `card_body_fill(
        actionButton(inputId = "redraw", label = "Redraw")
      )`
    ).rootNode;

    const parsed_node = rTreesitterToUiTree(parse_test.firstNamedChild!);

    expect(parsed_node.id).toEqual("card_body");
  });

  test("Handles named list arguments: With key value pairs", () => {
    const parse_test = parseRScript(
      my_parser,
      `selectInput(
        inputId = "choice",
        label = "Choose things",
        choices = list("key a" = "a", "key b" = "b", "key c"="c"),
        selected = "A"
      )`
    ).rootNode;

    const parsed_node = rTreesitterToUiTree(parse_test.firstNamedChild!);

    expect(parsed_node.namedArgs.choices).toEqual(
      expect.objectContaining({
        "key a": "a",
        "key b": "b",
        "key c": "c",
      })
    );
  });

  test("Handles named list arguments: Just values", () => {
    const parse_test = parseRScript(
      my_parser,
      `selectInput(
        inputId = "choice",
        label = "Choose things",
        choices = list("a", "b", "c"),
        selected = "a"
      )`
    ).rootNode;

    const parsed_node = rTreesitterToUiTree(parse_test.firstNamedChild!);

    expect(parsed_node.namedArgs.choices).toEqual(["a", "b", "c"]);
  });
});
