import type { Branch_Node } from "ast-parsing";
import { ast_to_ui_node } from "ast-parsing/src/ast_to_shiny_ui_node";

// This test being here is really because I can't get it to run inside of the
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
