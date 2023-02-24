import type { Branch_Node } from ".";

import { ast_to_ui_node } from "./ast_to_shiny_ui_node";

// ast parsing library due to imports not working well with editor dependency
test("Can construct text nodes correctly", () => {
  const text_contents = "raw card body text";
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
