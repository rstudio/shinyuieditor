import type { Branch_Node } from "r-ast-parsing";

import { text_node_to_code } from "../../Shiny-Ui-Elements/TextNode";
import type { ShinyUiParentNode } from "../../Shiny-Ui-Elements/uiNodeTypes";
import { ast_to_ui_node } from "../ast_to_shiny_ui_node";

const text_contents = "Text inside of text node";

describe("Can parse raw ast to text nodes", () => {
  test("Can construct raw text nodes correctly", () => {
    const call_w_text: Branch_Node = {
      val: [
        { val: "bslib::card_body_fill", type: "s" },
        { val: text_contents, type: "c" },
        { name: "fill", val: false, type: "b" },
      ],
      type: "e",
    };
    expect(
      (ast_to_ui_node(call_w_text) as ShinyUiParentNode).uiChildren
    ).toStrictEqual([
      {
        uiName: "textNode",
        uiArguments: expect.objectContaining({
          contents: text_contents,
        }),
      },
    ]);
  });

  test("Can construct wrapped text nodes correctly", () => {
    const call_w_text: Branch_Node = {
      val: [
        { val: "card_body_fill", type: "s" },
        {
          val: [
            { val: "h1", type: "s" },
            { val: text_contents, type: "c" },
          ],
          type: "e",
        },
        { name: "fill", val: true, type: "b" },
      ],
      type: "e",
    };
    expect(
      (ast_to_ui_node(call_w_text) as ShinyUiParentNode).uiChildren
    ).toStrictEqual([
      {
        uiName: "textNode",
        uiArguments: expect.objectContaining({
          contents: text_contents,
          size: "h1",
        }),
      },
    ]);
  });
});

describe("Can convert from ui text node to code", () => {
  test("Basic undecorated text", () => {
    expect(
      text_node_to_code({
        uiName: "textNode",
        uiArguments: {
          contents: text_contents,
        },
      })
    ).toEqual(`"${text_contents}"`);
  });
  test("Header text", () => {
    expect(
      text_node_to_code({
        uiName: "textNode",
        uiArguments: {
          contents: text_contents,
          size: "h2",
          decoration: "default",
        },
      })
    ).toEqual(`h2("${text_contents}")`);
  });
});
