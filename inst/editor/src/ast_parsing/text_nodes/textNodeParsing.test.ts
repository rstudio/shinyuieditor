import type { Branch_Node } from "..";
import { ast_to_ui_node } from "../ast_to_shiny_ui_node";

const text_contents = "Text inside of text node";

test("Can construct raw text nodes correctly", () => {
  const call_w_text: Branch_Node = {
    val: [
      { val: "bslib::card_body", type: "s" },
      { val: text_contents, type: "c" },
      { name: "fill", val: false, type: "b" },
    ],
    type: "e",
  };
  expect(ast_to_ui_node(call_w_text).uiChildren).toStrictEqual([
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
      { val: "card_body", type: "s" },
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
  expect(ast_to_ui_node(call_w_text).uiChildren).toStrictEqual([
    {
      uiName: "textNode",
      uiArguments: expect.objectContaining({
        contents: text_contents,
        size: "h1",
      }),
    },
  ]);
});
