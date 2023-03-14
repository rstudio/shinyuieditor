import type { Branch_Node } from "r-ast-parsing";

import type { KnownShinyUiNode } from "../Shiny-Ui-Elements/uiNodeTypes";

import { ast_to_ui_node } from "./ast_to_shiny_ui_node";

describe("Can handle unknown code properly", () => {
  test("Unknown symbols work", () => {
    const card_body_w_unknown_input: Branch_Node = {
      val: [
        { val: "card_body_fill", type: "s" },
        { val: "custom_input", type: "s" },
      ],
      type: "e",
    };
    const parsed_card_w_unknown = ast_to_ui_node(card_body_w_unknown_input);

    const expected_result: KnownShinyUiNode = {
      uiName: "bslib::card_body_fill",
      uiArguments: {},
      uiChildren: [
        {
          uiName: "unknownUiFunction",
          uiArguments: expect.objectContaining({ text: "custom_input" }),
        },
      ],
    };
    expect(parsed_card_w_unknown).toStrictEqual(expected_result);
  });

  test("Unknown function calls", () => {
    const card_body_w_unknown_fn_call: Branch_Node = {
      val: [
        { val: "card_body_fill", type: "s" },
        {
          val: [
            { val: "my_custom_fn", type: "s" },
            { name: "foo", val: "bar", type: "c" },
          ],
          type: "e",
        },
      ],
      type: "e",
    };

    const expected_result: KnownShinyUiNode = {
      uiName: "bslib::card_body_fill",
      uiArguments: {},
      uiChildren: [
        {
          uiName: "unknownUiFunction",
          uiArguments: expect.objectContaining({
            text: 'my_custom_fn(foo = "bar")',
          }),
        },
      ],
    };
    expect(ast_to_ui_node(card_body_w_unknown_fn_call)).toStrictEqual(
      expected_result
    );
  });
});

describe("Can convert from ui definition node in ast to the the UI Specific ast", () => {
  test("Basic test to avoid test errors", () => {
    expect(true).toEqual(true);
  });
  // test("Root node is right", () => {
  //   expect(ui_tree.uiName).toEqual("gridlayout::grid_page");
  // });

  // test("Correct number of children nodes", () => {
  //   expect(ui_tree.uiChildren).toHaveLength(4);
  // });

  // test("UI Arguments for grid_page parse properly", () => {
  //   expect(ui_tree.uiArguments.layout).toHaveLength(3);
  //   expect(ui_tree.uiArguments.row_sizes).toHaveLength(3);
  //   expect(ui_tree.uiArguments.col_sizes).toHaveLength(2);
  // });

  // test("Children are correctly recursed into", () => {
  //   expect(ui_tree.uiChildren?.[0].uiName).toEqual("gridlayout::grid_card");
  // });

  // test("Gives us the location of the ui nodes definition", () => {
  //   expect(ui_pos).toStrictEqual([5, 1, 47, 1]);
  // });

  // test("Preserves operator info so we can properly reconstruct the call", () => {
  //   expect(ui_assignment_operator).toEqual("<-");
  // });
});

export {};
