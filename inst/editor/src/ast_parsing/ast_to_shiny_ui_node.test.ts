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

  test("Unknown symbols as named arguments", () => {
    expect(
      ast_to_ui_node({
        val: [
          { val: "card_body_fill", type: "s" },
          { name: "max_height", val: "card_height", type: "s" },
        ],
        type: "e",
      })
    ).toStrictEqual(
      expect.objectContaining({
        uiName: "bslib::card_body_fill",
        uiArguments: {
          max_height: {
            uiName: "unknownUiFunction",
            uiArguments: expect.objectContaining({
              text: "card_height",
            }),
          },
        },
      })
    );
  });

  test("Unknown functions as named arguments", () => {
    expect(
      ast_to_ui_node({
        val: [
          { val: "card_body_fill", type: "s" },
          {
            name: "max_height",
            val: [
              { val: "make_px", type: "s" },
              { name: "num", val: 100, type: "n" },
            ],
            type: "e",
          },
        ],
        type: "e",
      })
    ).toStrictEqual(
      expect.objectContaining({
        uiName: "bslib::card_body_fill",
        uiArguments: {
          max_height: {
            uiName: "unknownUiFunction",
            uiArguments: expect.objectContaining({
              text: "make_px(num = 100)",
            }),
          },
        },
      })
    );
  });

  test("Immediately invoked functions are not mangled", () => {
    expect(
      ast_to_ui_node({
        val: [
          {
            val: [
              { val: "(", type: "s" },
              {
                val: [
                  { val: "function", type: "s" },
                  { val: [{ name: "name", val: "", type: "s" }], type: "e" },
                  {
                    val: [
                      { val: "paste", type: "s" },
                      { val: "hello", type: "c" },
                      { val: "name", type: "s" },
                    ],
                    type: "e",
                  },
                ],
                type: "e",
              },
            ],
            type: "e",
          },
          { name: "name", val: "shiny", type: "c" },
        ],
        type: "e",
      })
    ).toEqual({
      uiName: "unknownUiFunction",
      uiArguments: expect.objectContaining({
        text: `(function(name) {...})(name = "shiny")`,
      }),
    });
  });
});

test("Handle primative values as children", () => {
  const output: KnownShinyUiNode = {
    uiName: "bslib::card_body_fill",
    uiArguments: {},
    uiChildren: [
      { uiName: "textNode", uiArguments: { contents: "Hi" } },
      { uiName: "textNode", uiArguments: { contents: "3" } },
      { uiName: "textNode", uiArguments: { contents: "FALSE" } },
    ],
  };
  expect(
    ast_to_ui_node({
      val: [
        { val: "bslib::card_body_fill", type: "s" },
        { val: "Hi", type: "c" },
        { val: 3, type: "n" },
        { val: false, type: "b" },
      ],
      type: "e",
    })
  ).toStrictEqual(output);
});

export {};
